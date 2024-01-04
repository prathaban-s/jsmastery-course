import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { convertNumber, getTimestamp } from "@/lib/utils";

interface QuestionCardType {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    name: string;
    _id: string;
  };
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  answers,
  views,
  createdAt,
}: QuestionCardType) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`questions/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* Nee to add delete icons */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.length > 0
          ? tags.map((tag) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))
          : ""}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={`asked ${getTimestamp(new Date())}`}
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
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={convertNumber(answers)}
          title="Answers"
          textStyles="small-meditum text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={convertNumber(views)}
          title="Views"
          textStyles="small-meditum text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
