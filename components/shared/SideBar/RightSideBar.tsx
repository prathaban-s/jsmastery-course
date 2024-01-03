import Image from "next/image";
import React from "react";
import RenderTag from "../RenderTag";
import Link from "next/link";

const RightSideBar = () => {
  const questions = [
    {
      _id: "question_1",
      question:
        "Would it be appropriate to point out an error in another paper during a referee report?",
    },
    {
      _id: "question_2",
      question: "How can an airconditioning machine exist?",
    },
    {
      _id: "question_3",
      question: "Interrogated every time crossing UK Border as citizen",
    },
    {
      _id: "question_4",
      question: "Low digit addition generator",
    },
    {
      _id: "question_5",
      question: "What is an example of 3 numbers that do not make up a vector?",
    },
  ];

  const tags = [
    {
      _id: "id_1",
      name: "JAVASCRIPT",
      totalCount: 5,
    },
    {
      _id: "id_2",
      name: "NEXT JS",
      totalCount: 5,
    },
    {
      _id: "id_3",
      name: "REACT JS",
      totalCount: 5,
    },
    {
      _id: "id_4",
      name: "NODE JS",
      totalCount: 5,
    },
    {
      _id: "id_5",
      name: "PYTHON",
      totalCount: 5,
    },
    {
      _id: "id_6",
      name: "MICROSOFT AZURE",
      totalCount: 5,
    },
    {
      _id: "id_7",
      name: "POSTQRESQL",
      totalCount: 5,
    },
  ];
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 hidden h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 xl:flex xl:w-[350px] dark:shadow-none">
      <div className="">
        <h3 className="h3-bold text-dark100_light900 mb-2"> Top Questions </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((item) => {
            return (
              <Link
                key={item._id}
                href={`questions/${item._id}`}
                className="flex items-start justify-between gap-7"
              >
                <p className="text-dark300_light700 body-regular">
                  {item.question}
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
                totalCount={tag.totalCount}
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
