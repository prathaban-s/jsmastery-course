import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const EditQuestionPage = async ({ params }: URLProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId: params.id });

  if (!question) {
    redirect("/");
  }

  if (question?.author.clerkId.toString() !== userId.toString()) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900"> Edit Question</h1>
      <div className="mt-1">
        <Question
          mongoUserId={mongoUser._id.toString()}
          type="edit"
          questionId={question._id.toString()}
          content={question.content.toString()}
          tags={question.tags.map((tag: any) => tag.name)}
          title={question.title}
        />
      </div>
    </div>
  );
};

export default EditQuestionPage;
