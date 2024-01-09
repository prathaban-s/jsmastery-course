import AllAnswers from "@/components/shared/AllAnswers";
import Answer from "@/components/shared/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { convertNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    filter?: string;
    page?: string;
  };
}

const QuestionDetail = async ({ params, searchParams }: Props) => {
  const { userId } = auth();
  let user;
  if (userId) {
    user = await getUserById({ userId });
  }

  const question = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`profile/${question.author._id}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="user image"
              height={22}
              width={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}{" "}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={question._id.toString()}
              userId={user._id.toString()}
              upvotes={question.upvotes.length}
              hasUpvoted={question.upvotes.includes(user._id)}
              downvotes={question.downvotes.length}
              hasDownvoted={question.downvotes.includes(user._id)}
              hasSaved={user?.saved.includes(question._id.toString())}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          title=""
          value={`asked ${getTimestamp(question.createdAt)}`}
          textStyles="small-meditum text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={convertNumber(question.answers.length)}
          title="Answers"
          textStyles="small-meditum text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={convertNumber(question.views)}
          title="Views"
          textStyles="small-meditum text-dark400_light800"
        />
      </div>
      <ParseHTML data={question.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <AllAnswers
        questionId={question._id.toString()}
        userId={user._id.toString()}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page}
      />
      <Answer
        authorId={JSON.stringify(user._id)}
        question={question.content}
        questionId={JSON.stringify(question._id)}
      />
    </>
  );
};

export default QuestionDetail;
