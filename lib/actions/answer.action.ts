"use server";

import { connnectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Interaction from "@/database/iteraction.model";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connnectToDatabase();
    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAnswersForQuestion = async (params: GetAnswersParams) => {
  try {
    connnectToDatabase();

    const { questionId, page = 0, pageSize = 10, sortBy } = params;

    let sortOptions = {};

    if (sortBy) {
      switch (sortBy) {
        case "highestUpvotes":
          sortOptions = {
            upvotes: -1,
          };
          break;
        case "lowestUpvotes":
          sortOptions = {
            upvotes: 1,
          };
          break;
        case "recent":
          sortOptions = {
            createdAt: -1,
          };
          break;
        case "old":
          sortOptions = {
            createdAt: 1,
          };
          break;
        default:
          break;
      }
    }

    const answers = await Answer.find({ questionId })
      .populate("author", "_id name clerkId picture")
      .sort(sortOptions)
      .limit(pageSize)
      .skip(page * pageSize);

    return { answers };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    const { answerId, userId, path, hasupVoted, hasdownVoted } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: {
          upvotes: userId,
        },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Incroment author reputation

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const downvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    const { answerId, userId, path, hasupVoted, hasdownVoted } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: {
          downvotes: userId,
        },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Incroment author reputation

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deletAnswerById = async (params: DeleteAnswerParams) => {
  try {
    connnectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer no found");
    }

    await Answer.findByIdAndDelete(answerId);

    await Answer.deleteMany({ question: answerId });

    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
