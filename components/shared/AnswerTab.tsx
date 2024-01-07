import { getAnswersByUserId } from "@/lib/actions/user.action";
import React from "react";
import NoResult from "./NoResult";
import AnswerCard from "../card/AnswerCard";

interface Props {
  clerkId?: string;
  userId: string;
}

const AnswerTab = async ({ userId }: Props) => {
  const answers = await getAnswersByUserId({
    userId,
  });
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {answers && answers.length > 0 ? (
        answers.map((answer: any) => (
          <AnswerCard
            key={answer._id}
            _id={answer._id.toString()}
            content={answer.content}
            author={answer.author}
            upvotes={answer.upvotes.length}
            createdAt={answer.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="There is no answers to show"
          description="You haven't posted any answer"
          btnTitle="Answer a question"
          route="/"
        />
      )}
    </div>
  );
};

export default AnswerTab;
