"use client";

import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const GlobalSearchResult = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [result, setResult] = useState([
    { type: "question", id: 1, title: "Next js" },
    { type: "tag", id: 1, title: "Next js" },
    { type: "user", id: 1, title: "Next js" },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  const renderLink = (type: string, url: string) => {
    return "/";
  };

  useEffect(() => {
    // const fetchResult = async () => {
    setResult([]);
    setLoading(true);
    //   try {
    //     // d
    //   } catch (err) {
    //     console.log(err);
    //     throw err;
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  }, [global, type]);

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400 ">
      <GlobalSearchResult />
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5 ">
          Top Matches
        </p>
        {loading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
            <p className="body-regular text-dark200_light800">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink("type", "itemId")}
                  key={`{item}-${index}`}
                  className="flex w-full cursor-pointer items-center gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tag"
                    height={18}
                    width={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="text-dark200_light800 body-medium line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 small-medium mt-1">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;
