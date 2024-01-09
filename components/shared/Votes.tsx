"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  toggleSaveQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { convertNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "../ui/use-toast";

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

  const route = useRouter();
  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({ title: "Please log in" });
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
      toast({
        title: `Upvote ${hasUpvoted ? "Successfully" : "Removed"}`,
        variant: !hasUpvoted ? "default" : "destructive",
      });
    }

    if (action === "downvote") {
      if (type === "answer") {
        await downvoteAnswer(params);
      } else {
        await downvoteQuestion(params);
      }
      toast({
        title: `Downvote ${hasDownvoted ? "Successfully" : "Removed"}`,
        variant: !hasDownvoted ? "default" : "destructive",
      });
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

    toast({
      title: `Question ${!hasSaved ? "Saved" : "Removed"} from your collection`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  useEffect(() => {
    if (type === "question") {
      viewQuestion({
        questionId: itemId,
        userId: userId || undefined,
      });
    }
  }, [type, itemId, userId, path, route]);
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
