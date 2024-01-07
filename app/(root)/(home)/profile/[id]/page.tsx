import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMonthAndYearFromDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";

const ProfileDetailPage = async ({ params }: URLProps) => {
  const { userId } = auth();

  const clerkId = params.id;
  const { user } = await getUserInfo({
    userId: clerkId,
  });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-5 lg:flex-row">
          <Image
            src={user.picture}
            alt="profile pic"
            width={140}
            height={140}
            className="rounded-full object-contain"
          />

          <div className="mt-2 ">
            <h2 className="h2-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h2>
            <p className="paragraph-regular text-dark500_light500 mt-2">
              @{user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {/* {Need to add location} */}
              {user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}
              <ProfileLink
                title={getMonthAndYearFromDate(user.joinDate)}
                imgUrl="/assets/icons/calendar.svg"
              />
              {user.portfoliowebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolio}
                  title="Portfolio"
                />
              )}
            </div>
            {user.bio && (
              <p className="paragraph-regular text-dark400_light800">
                {user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userId ? (
              <>
                <Link href="/profile/edit">
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-3 py-4">
                    Edit Profile
                  </Button>
                </Link>
              </>
            ) : (
              ""
            )}
          </SignedIn>
        </div>
      </div>
      Stats
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="w-[400px] flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="answers">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileDetailPage;
