"use server";

import { connnectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connnectToDatabase();
    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    console.log(newAnswer);
    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAnswersForQuestion = async (params: GetAnswersParams) => {
  try {
    connnectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ questionId })
      .populate("author", "_id name clerkId picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
