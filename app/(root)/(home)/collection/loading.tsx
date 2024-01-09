import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Question</h1>
      </div>
      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28 flex-1" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
