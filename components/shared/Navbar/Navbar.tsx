import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Theme } from "./Theme";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none ">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="logo"
          height={23}
          width={23}
        />
        <p className="h2-bold font-spaceGrotesk text-primary-500 max-sm:hidden">
          Code Palette
        </p>
      </Link>

      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};
