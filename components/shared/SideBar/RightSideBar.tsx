import Image from "next/image";
import React from "react";
import RenderTag from "../RenderTag";
import Link from "next/link";
import { getTopQuestion } from "@/lib/actions/question.action";
import { getTopRatedTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  const questions = await getTopQuestion();

  const tags = await getTopRatedTags();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 hidden h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 xl:flex xl:w-[350px] dark:shadow-none">
      <div className="">
        <h3 className="h3-bold text-dark100_light900 mb-2"> Top Questions </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((item) => {
            return (
              <Link
                key={item._id}
                href={`question/${item._id}`}
                className="flex items-start justify-between gap-7"
              >
                <p className="text-dark300_light700 body-regular">
                  {item.title}
                </p>
                <Image
                  src="./assets/icons/chevron-right.svg"
                  alt="arrow-right"
                  height={15}
                  width={15}
                  className="invert-colors mx-2"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark100_light900 mb-2">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {tags.map((tag) => {
            return (
              <RenderTag
                _id={tag._id}
                name={tag.name}
                totalCount={tag.numberOfQuestions}
                showCount={true}
                key={tag._id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
