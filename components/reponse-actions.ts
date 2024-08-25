"use server";

import { TEXTAREA_MAX_LENGTH } from "@/lib/constant";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const responseSchema = z
  .string()
  .min(1, { message: "Too short!" })
  .max(TEXTAREA_MAX_LENGTH, { message: "Too long!" });

export const uploadResponse = async (response: string, tweetId: number) => {
  const result = responseSchema.safeParse(response);
  if (!result.success) {
    return {
      result: false,
    };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.response.create({
        data: {
          payload: response,
          userId: session.id,
          tweetId,
        },
      });
    }
    revalidateTag(`tweet-responses-${tweetId}`);
    return {
      result: true,
    };
  }
};

export const deleteResponse = async (
  responseId: number,
  sessionId: number,
  tweetId: number
) => {
  const response = await db.response.findUnique({
    where: {
      id: responseId,
    },
  });
  if (response && response.userId === sessionId) {
    await db.response.delete({
      where: {
        id: responseId,
      },
    });
    revalidateTag(`tweet-responses-${tweetId}`);
  }
};
