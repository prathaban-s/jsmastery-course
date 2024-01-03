"use client";

import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const LeftSideBar = () => {
  const pathName = usePathname();
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((sidebarLink) => {
          const isActive =
            (pathName.includes(sidebarLink.route) &&
              sidebarLink.route.length > 1) ||
            pathName === sidebarLink.route;
          return (
            <React.Fragment key={sidebarLink.route}>
              <Link
                href={sidebarLink.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={sidebarLink.imgURL}
                  alt={sidebarLink.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {sidebarLink.label}
                </p>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
      <SignedOut>
        <div className="mt-1 flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Login</span>
            </Button>
          </Link>
        </div>
        <div className="mt-1 flex flex-col gap-3">
          <Link href="/sign-up">
            <Button className="text-dark400_light900 small-medium btn-tertiary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="login"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden"> Sign Up </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};
