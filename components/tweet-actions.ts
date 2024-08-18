"use server";

import { getInitialTweets } from "@/app/(home)/actions";
import { InitialTweets } from "@/app/(home)/page";
import { TEXTAREA_MAX_LENGTH } from "@/lib/constant";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z
  .string({
    required_error: "You should write down tweet!",
  })
  .min(1, { message: "You should write down tweet!" })
  .max(TEXTAREA_MAX_LENGTH, { message: "Too long!" });

interface UploadTweetSuccess {
  success: true;
  tweets: InitialTweets;
}

interface UploadTweetFailure {
  success: false;
  formErrors: string[];
}

type UploadTweetResult = UploadTweetSuccess | UploadTweetFailure;

export const uploadTweet = async (
  prevState: any,
  formData: FormData
): Promise<UploadTweetResult> => {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data.tweet);

  if (!result.success) {
    return {
      formErrors: result.error.flatten().formErrors || [],
      success: false,
    };
  } else {
    const session = await getSession();
    const userId = session.id;
    if (!userId) {
      redirect("/log-in");
    }
    await db.tweet.create({
      data: {
        tweet: result.data,
        userId: userId,
      },
    });
    const tweets = await getInitialTweets();
    return {
      success: true,
      tweets,
    };
  }
};
