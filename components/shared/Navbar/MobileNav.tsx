"use client";

import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <>
      {sidebarLinks.map((sidebarLink) => {
        const isActive =
          (pathName.includes(sidebarLink.route) &&
            sidebarLink.route.length > 1) ||
          pathName === sidebarLink.route;
        return (
          <SheetClose asChild key={sidebarLink.route}>
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
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {sidebarLink.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
};

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="hamburger"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            alt="logo"
            height={23}
            width={23}
          />
          <p className="h2-bold font-spaceGrotesk text-primary-500">
            Code Palette
          </p>
        </Link>
        <section className="flex h-full flex-col gap-6 pt-16">
          <NavContent />
        </section>
        <SignedOut>
          <SheetClose asChild>
            <div className="mt-1 flex flex-col gap-3">
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient"> Login </span>
                </Button>
              </Link>
            </div>
          </SheetClose>
          <SheetClose asChild>
            <div className="mt-1 flex flex-col gap-3">
              <Link href="/sign-up">
                <Button className="text-dark400_light900 small-medium btn-tertiary min-h-[40px] w-full rounded-lg px-4 py-3 shadow-none">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SheetClose>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};
