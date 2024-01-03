import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NoResult = () => {
  return (
    <div className="flex-center mt-10 w-full flex-col">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">
        There is no question to show
      </h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        Be the first one to break the silence!. As a Question and kickstart the
        discussion. Your query could be the next big thing others learn from.
        Get Involved!
      </p>

      <Link href="/">
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          As a Question
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
