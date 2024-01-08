import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const EditProfilePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userInfo = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900"> Edit Question</h1>
      <div className="mt-1">
        <Profile
          name={userInfo.name}
          username={userInfo.username}
          location={userInfo.location}
          bio={userInfo.bio}
          clerkId={userInfo.clerkId}
        />
      </div>
    </div>
  );
};

export default EditProfilePage;
