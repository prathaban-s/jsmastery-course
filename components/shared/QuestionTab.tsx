import { getQuestionsByUserId } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../card/QuestionCard";
import NoResult from "./NoResult";

interface Props {
  clerkId?: string;
  userId: string;
}

const QuestionTab = async ({ userId }: Props) => {
  const questions = await getQuestionsByUserId({
    userId,
  });
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {questions && questions.length > 0 ? (
        questions.map((question: any) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes.length}
            views={question.views}
            answers={question.answers.length}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="There is no question to show"
          description="Be the first one to break the silence!. As a Question and kickstart the
      discussion. Your query could be the next big thing others learn from.
      Get Involved!"
          btnTitle="Ask a Question"
          route="/"
        />
      )}
    </div>
  );
};

export default QuestionTab;
