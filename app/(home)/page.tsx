import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getInitialTweets } from "./actions";
import HomeContent from "@/components/home-content";

const getTweetCount = async () => {
  const count = await db.tweet.count();
  return count;
};

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  //const totalCount = await getTweetCount();
  return (
    <div className="max-w-screen-sm mx-auto my-16">
      <div className="flex flex-col gap-10 py-8 px-6">
        <div className="flex justify-center items-center">
          <span className="text-6xl">Welcome!</span>
        </div>
        <HomeContent initialTweets={initialTweets} />
      </div>
    </div>
  );
}
