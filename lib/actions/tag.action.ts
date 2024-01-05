"use server";

import User from "@/database/user.model";
import { connnectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  try {
    connnectToDatabase();
    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Need to do reteraction

    return [
      { _id: "1", name: "html" },
      { _id: "2", name: "css" },
      { _id: "3", name: "python" },
    ];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connnectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
