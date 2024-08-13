import Pagination from "@/components/pagination";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const getInitialTweets = async () => {
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
  return tweets;
};

const getTweetCount = async () => {
  const count = await db.tweet.count();
  return count;
};

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  const totalCount = await getTweetCount();
  return (
    <div className="max-w-screen-sm mx-auto my-20">
      <div className="flex flex-col gap-10 py-8 px-6">
        <div className="flex justify-center items-center">
          <span className="text-6xl">Welcome!</span>
        </div>
        <TweetList initialTweets={initialTweets} totalCount={totalCount} />
      </div>
    </div>
  );
}
