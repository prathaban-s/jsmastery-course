"use server";

import User from "@/database/user.model";
import { connnectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    connnectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (err) {
    console.log(err);
  }
}
