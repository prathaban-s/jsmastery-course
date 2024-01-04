import QuestionCard from "@/components/card/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { LocalSearch } from "@/components/shared/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";
import React from "react";

const Home = () => {
  const questions = [
    {
      _id: "1",
      title: "How to center a div?",
      tags: [
        {
          _id: "1",
          name: "python",
        },
      ],
      author: "Johne Doe",
      upvotes: 10,
      views: 100,
      answers: 2,
      createdAt: "2024-01-03T15:30:00Z",
    },
    {
      _id: "2",
      title: "How to make items center?",
      tags: [
        {
          _id: "1",
          name: "html",
        },
      ],
      author: "Johne Doe",
      upvotes: 10,
      views: 100,
      answers: 2,
      createdAt: "2024-01-03T15:30:00Z",
    },
    {
      _id: "3",
      title: "How to add flex column",
      tags: [
        {
          _id: "2",
          name: "css",
        },
      ],
      author: "Johne Doe",
      upvotes: 10,
      views: 103462340,
      answers: 2,
      createdAt: "2024-01-03T15:30:00Z",
    },
  ];
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1 w-full"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first one to break the silence!. As a Question and kickstart the
            discussion. Your query could be the next big thing others learn from.
            Get Involved!"
            btnTitle="Ask a Question"
            route="/"
          />
        )}
      </div>
    </>
  );
};

export default Home;
