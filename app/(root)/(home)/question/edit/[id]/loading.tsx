import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-14 w-full flex-1" />
      </div>

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28 flex-1" />
        </div>
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-xl max-xs:min-w-full xs:w-[260px]"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
