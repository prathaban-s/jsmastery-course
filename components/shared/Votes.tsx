"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  toggleSaveQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { convertNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: VotesProps) => {
  const path = usePathname();
  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }
    const params = {
      questionId: "",
      answerId: "",
      userId,
      hasupVoted: hasUpvoted,
      hasdownVoted: hasDownvoted,
      path,
    };
    if (type === "question") {
      params.questionId = itemId;
    } else {
      params.answerId = itemId;
    }
    if (action === "upvote") {
      if (type === "answer") {
        await upvoteAnswer(params);
      } else {
        await upvoteQuestion(params);
      }
    }

    if (action === "downvote") {
      if (type === "answer") {
        await downvoteAnswer(params);
      } else {
        await downvoteQuestion(params);
      }
    }
  };

  const handleSave = async () => {
    if (!userId) {
      return;
    }

    await toggleSaveQuestion({
      questionId: itemId,
      userId,
      path,
    });
  };
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="up vote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              handleVote("upvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {convertNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="down vote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              handleVote("downvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {convertNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" ? (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="Save"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => {
            handleSave();
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Votes;
