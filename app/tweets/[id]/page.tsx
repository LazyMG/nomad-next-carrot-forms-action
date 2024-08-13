import db from "@/lib/db";
import { notFound } from "next/navigation";

const getTweet = async (id: number) => {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
  return tweet;
};

const TweetDetail = async ({ params }: { params: { id: string } }) => {
  const tweetId = Number(params.id);
  if (isNaN(tweetId)) {
    notFound();
  }
  const tweet = await getTweet(tweetId);
  return (
    <div className="max-w-screen-sm mx-auto my-12">
      <div className="flex flex-col gap-3 py-8 px-6">
        <div className="p-2">{tweet?.tweet}</div>
        <div className="w-full flex flex-col border-2 p-2 rounded-md">
          <div className="flex items-center gap-5">
            <span className="text-xl">{tweet?.user.username}</span>
            <span className="text-neutral-400">{tweet?.user.email}</span>
          </div>

          {tweet?.created_at.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
