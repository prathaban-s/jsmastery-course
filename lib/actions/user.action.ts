"use server";

import User from "@/database/user.model";
import { connnectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
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
