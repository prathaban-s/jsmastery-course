import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { LocalSearch } from "@/components/shared/Search/LocalSearch";
import { QuestionFilters } from "@/constants/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Home = async () => {
  // const result = await getQuestions({});
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const result = await getSavedQuestions({ clerkId: userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Question</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1 w-full"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result && result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers.length}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no saved question to show"
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
