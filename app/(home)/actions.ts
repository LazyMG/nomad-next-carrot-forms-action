"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getInitialTweets = async () => {
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
    take: 5,
  });
  revalidatePath("/");
  return tweets;
};

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
