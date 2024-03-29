import { getAnswersForQuestion } from "@/lib/actions/answer.action";
import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filter";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  totalAnswers: number;
  userId: string;
  page?: string;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const { answers, isNext } = await getAnswersForQuestion({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient"> {totalAnswers} Answers </h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {answers && answers.length > 0 ? (
          <>
            {answers.map((answer: any) => (
              <article key={answer._id} className="light-border border-b py-10">
                <div className=" mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author.picture}
                      width={18}
                      height={18}
                      alt="Profile pic"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700 ">
                        {" "}
                        {answer.author.name}{" "}
                      </p>
                      <p className="small-regular text-light400_light500 line-clamp-1">
                        <span className="ml-1 max-sm:hidden">
                          answered {getTimestamp(answer.createdAt)}
                        </span>
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <Votes
                      type="answer"
                      itemId={answer._id.toString()}
                      userId={userId}
                      upvotes={answer.upvotes.length}
                      hasUpvoted={answer.upvotes.includes(userId)}
                      downvotes={answer.downvotes.length}
                      hasDownvoted={answer.downvotes.includes(userId)}
                    />
                  </div>
                </div>
                <ParseHTML data={answer.content} />
              </article>
            ))}

            <div className="mt-10">
              <Pagination pageNumber={page ? +page : 1} isNext={isNext} />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AllAnswers;
