import QuestionCard from "@/components/card/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { LocalSearch } from "@/components/shared/Search/LocalSearch";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import React from "react";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    q?: string;
    page?: string;
  };
}

const TagDetailPage = async ({ params, searchParams }: Props) => {
  const tagId = params.id;
  const result = await getQuestionByTagId({
    tagId,
    searchQuery: searchParams?.q,
    page: searchParams?.page ? +searchParams?.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.title}</h1>

      <div className="mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={`/tags/${tagId}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1 w-full"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result && result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id.toString()}
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
            title="There is no questions to show for this tag"
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

export default TagDetailPage;
