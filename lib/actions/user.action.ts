"use server";

import User from "@/database/user.model";
import { connnectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assingBadges } from "../utils";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connnectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (err) {
    console.log(err);
  }
}

export const getAllUsers = async (params: GetAllUsersParams) => {
  try {
    connnectToDatabase();
    const { page = 0, pageSize = 10, searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    if (filter) {
      switch (filter) {
        case "new_users":
          sortOptions = { joinedAt: -1 };
          break;
        case "old_users":
          sortOptions = { joinedAt: 1 };
          break;
        case "top_contributors":
          sortOptions = { reputation: -1 };
          break;
        default:
          break;
      }
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalUsers = await User.countDocuments(query);

    const isNext = totalUsers > (page - 1) * pageSize + users.length;
    return { users, isNext };
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (userData: CreateUserParams) => {
  try {
    connnectToDatabase();
    const newUser = User.create(userData);
    console.log(newUser);
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (userData: UpdateUserParams) => {
  try {
    connnectToDatabase();

    const { clerkId, updateData, path } = userData;
    const existingUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return existingUser;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (userData: DeleteUserParams) => {
  try {
    connnectToDatabase();

    const { clerkId } = userData;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("No User Exist");
    }

    // const userQuestionIds = await Question.find({
    //   author: user._id,
    // }).distinct("_id");

    await Question.deleteMany({ author: user._id });

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const getSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connnectToDatabase();

    const { clerkId, searchQuery, pageSize = 2, page = 1, filter } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};

    if (filter) {
      switch (filter) {
        case "most_recent":
          sortOptions = {
            createdAt: -1,
          };
          break;
        case "oldest":
          sortOptions = {
            createdAt: 1,
          };
          break;
        case "most_voted":
          sortOptions = {
            upvotes: -1,
          };
          break;
        case "most_viewed":
          sortOptions = {
            views: -1,
          };
          break;
        case "most_answered":
          sortOptions = {
            answers: -1,
          };
          break;
        default:
          break;
      }
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        limit: pageSize,
        skip: (page - 1) * pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        {
          path: "author",
          model: User,
          select: "_id name clerkId picture",
        },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isNext = user.saved.length > pageSize;

    return { questions: user.saved, isNext };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserInfo = async (params: GetUserByIdParams) => {
  try {
    connnectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [asnwerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [questionViews] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: asnwerUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    const badgeCounts = assingBadges({ criteria });

    return { user, totalQuestions, totalAnswers, badgeCounts };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getQuestionsByUserId = async (params: {
  userId: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    connnectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const questions = await Question.find({ author: userId })
      .populate({ path: "tags", model: Tag })
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    return questions;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAnswersByUserId = async (params: {
  userId: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    connnectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const asnwers = await Answer.find({ author: userId })
      .populate("author", "_id name clerkId picture")
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    return asnwers;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
