"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.liked.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
};

export const disLikeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.liked.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
};
