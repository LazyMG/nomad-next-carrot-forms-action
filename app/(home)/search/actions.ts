"use server";

import db from "@/lib/db";

export const searchTweet = async (keyword: string) => {
  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
};
