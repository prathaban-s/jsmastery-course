import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import { convertNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "../shared/ParseHTML";

interface AnswerCardType {
  _id: string;
  content: string;
  author: {
    name: string;
    _id: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  content,
  author,
  upvotes,
  createdAt,
}: AnswerCardType) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              <ParseHTML data={content} />
            </h3>
          </Link>
        </div>
        {/* Nee to add delete icons */}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`asked ${getTimestamp(createdAt)}`}
          textStyles="body-medium text-dark400_light800"
          href={`/profile/${author._id}`}
          isAuthor
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={convertNumber(upvotes)}
          title="Votes"
          textStyles="small-meditum text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
