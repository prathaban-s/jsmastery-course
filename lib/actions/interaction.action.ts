"use server";

import Question from "@/database/question.model";
import { connnectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/iteraction.model";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    await connnectToDatabase();
    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        return console.log("User has already viewed the data");
      }
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
