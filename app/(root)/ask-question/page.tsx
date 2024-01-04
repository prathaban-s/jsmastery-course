import React from "react";
import Question from "../../../components/forms/Question";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestion = async () => {
  // const { userId } = auth();

  const userId = "clerk123";
  if (!userId) {
    redirect("/sign-in");
  }
  console.log(userId);

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900"> Ask a Question</h1>
      <div className="mt-1">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
