import { Prisma } from "@prisma/client";
import { getInitialTweets } from "./actions";
import HomeContent from "@/components/home-content";

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="flex flex-col gap-10 pt-7 px-3">
      <HomeContent initialTweets={initialTweets} />
    </div>
  );
}
