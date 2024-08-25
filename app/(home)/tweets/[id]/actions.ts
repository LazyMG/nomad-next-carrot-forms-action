"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";

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

export const deleteTweet = async (tweetId: number) => {
  const session = await getSession();
  if (!session) {
    console.error("User is not logged in.");
    return;
  }

  try {
    const tweet = await db.tweet.findUnique({
      where: { id: tweetId },
    });

    if (!tweet) {
      console.error("Tweet not found.");
      return;
    }

    if (tweet.userId !== session.id) {
      console.error("You can only delete your own tweets.");
      return;
    }

    await db.tweet.delete({
      where: {
        id: tweetId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log("Failed to delete tweet:", error);
  }
};
