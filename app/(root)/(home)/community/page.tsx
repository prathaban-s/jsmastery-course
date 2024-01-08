import { LocalSearch } from "@/components/shared/Search/LocalSearch";
import React from "react";
import Filter from "@/components/shared/Filter";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import UserCard from "@/components/card/UserCard";
import { SearchParamsProps } from "@/types";
import { UserFilters } from "@/constants/filter";

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Community</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing peoples"
          otherClasses="flex-1 w-full"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result && result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p> No users yet </p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Be the first one to join!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Community;
