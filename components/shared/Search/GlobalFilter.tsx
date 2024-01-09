"use client";

import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filter";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilter = () => {
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active] = useState(typeParams || "");

  // useState(() => {}, []);
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-3"></div>
      {GlobalSearchFilters.map((item) => (
        <Button
          className={`light-border-2 small-medium rounded-xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500 ${
            active === item.value
              ? "bg-primary-500 text-light-900"
              : "bg-light-700 text-dark-500 hover:text-primary-500 dark:bg-dark-500"
          }`}
          key={item.value}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default GlobalFilter;
