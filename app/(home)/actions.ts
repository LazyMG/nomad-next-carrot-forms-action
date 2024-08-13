"use server";

import db from "@/lib/db";

export const getMoreTweets = async (
  cursorId: number,
  take: number,
  isBack: boolean
) => {
  const tweets = await db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    take: isBack ? -take : take,
    cursor: {
      id: cursorId,
    },
    skip: 1,
  });
  return tweets;
};
