"use server";

import User from "@/database/user.model";
import { connnectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

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

    const { searchQuery, pageSize = 10, page = 1, filter } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortOptions = {};
    if (filter) {
      switch (filter) {
        case "popular":
          sortOptions = {
            questions: -1,
          };
          break;
        case "recent":
          sortOptions = {
            createdAt: -1,
          };
          break;
        case "name":
          sortOptions = {
            name: 1,
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

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > (page - 1) * pageSize + tags.length;

    return { tags, isNext };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getQuestionByTagId = async (params: GetQuestionsByTagIdParams) => {
  try {
    connnectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const tag = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
        limit: pageSize,
        skip: pageSize * (page - 1),
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

    if (!tag) {
      throw new Error("User not found");
    }

    return { title: tag.name, questions: tag.questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTopRatedTags = async () => {
  try {
    connnectToDatabase();

    const tags = await Tag.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return tags;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
