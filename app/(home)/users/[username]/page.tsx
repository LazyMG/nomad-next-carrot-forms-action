import Tweet from "@/components/tweet";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getUserDetail(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      tweets: {
        select: {
          id: true,
          tweet: true,
          created_at: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });
  return user;
}

const UserDetail = async ({ params }: { params: { username: string } }) => {
  const userId = Number(params.username);
  if (isNaN(userId)) notFound();
  const user = await getUserDetail(userId);
  return (
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-1 font-semibold text-lg">
        <span>Username: {user?.username}</span>
        <span>Email: {user?.email}</span>
        <span>
          CreatedAt:{" "}
          {user?.created_at.toLocaleDateString() +
            " " +
            user?.created_at.toLocaleTimeString()}
        </span>
      </div>
      <div className="h-0.5 bg-neutral-100" />
      <div className="flex flex-col gap-4">
        {user?.tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetDate={tweet.created_at}
            tweet={tweet.tweet}
            tweetId={tweet.id}
            tweetUser={user?.username}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDetail;
