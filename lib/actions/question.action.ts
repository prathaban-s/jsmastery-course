"use server";
import Question from "@/database/question.model";
import { connnectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/iteraction.model";

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connnectToDatabase();
    // const { page, pageSize, searchQuery, filter } = params;

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return { questions };
  } catch (err) {
    console.log(err);
  }
};

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    connnectToDatabase();
    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      });

    return question;
  } catch (err) {
    console.log(err);
  }
};

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connnectToDatabase();

    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: {
            questions: question._id,
          },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: {
          $each: tagDocuments,
        },
      },
    });

    revalidatePath(path);

    // Need to give reputaion for user
  } catch (err) {}
}

export const updateQuestionById = async (params: EditQuestionParams) => {
  try {
    connnectToDatabase();
    const { questionId, path, title, content } = params;

    const question = await Question.findById(questionId).populate({
      path: "tags",
      model: Tag,
    });

    if (!question) {
      throw new Error("Question not found");
    }
    question.title = title;
    question.content = content;
    await question.save();
    revalidatePath(path);
  } catch (err) {
    console.log("err");
    console.log(err);
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { questionId, userId, path, hasupVoted, hasdownVoted } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Incroment author reputation

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { questionId, userId, path, hasupVoted, hasdownVoted } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Incroment author reputation

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const toggleSaveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    connnectToDatabase();
    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const hasQuestion = user?.saved.includes(questionId);

    if (hasQuestion) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteQuestionById = async (params: DeleteQuestionParams) => {
  try {
    connnectToDatabase();
    const { questionId, path } = params;

    await Question.findByIdAndDelete(questionId);

    await Answer.deleteMany({ question: questionId });

    await Interaction.deleteMany({ question: questionId });

    await Tag.updateMany(
      { questions: questionId },
      {
        $pull: {
          questions: questionId,
        },
      }
    );

    await User.updateMany(
      {
        saved: questionId,
      },
      {
        $pull: {
          saved: questionId,
        },
      }
    );

    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTopQuestion = async () => {
  try {
    connnectToDatabase();

    const topQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return topQuestions;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
