import LikeButton from "@/components/like-button";
import TweetContent from "@/components/tweet-content";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";
import DeleteButton from "@/components/delete-button";

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
          id: true,
        },
      },
    },
  });
  return tweet;
};

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.liked.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.liked.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

async function getTweetResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return responses ?? [];
}

async function getCachedResponse(tweetId: number) {
  const cachedOperation = nextCache(getTweetResponses, ["tweet-responses"], {
    tags: [`tweet-responses-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

const TweetDetail = async ({ params }: { params: { id: string } }) => {
  const tweetId = Number(params.id);
  if (isNaN(tweetId)) {
    notFound();
  }
  const tweet = await getCachedTweet(tweetId);
  const { likeCount, isLiked } = await getCachedLikeStatus(tweetId);
  const responses = await getCachedResponse(tweetId);
  const session = await getSession();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 pt-6 px-6">
        <div className="bg-white shadow-md rounded-lg flex flex-col items-start gap-1 px-2 pb-2">
          <Link
            href={`/users/${tweet?.userId}`}
            className="text-lg hover:text-green-600"
          >
            {tweet?.user.username}
          </Link>
          <span className="text-xs opacity-50">{tweet?.user.email}</span>
        </div>
        <div className="h-0.5 bg-neutral-100" />
        <div className="flex flex-col gap-3">
          <div className="text-2xl">{tweet?.tweet}</div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2">
              <LikeButton
                isLiked={isLiked}
                likeCount={likeCount}
                tweetId={tweetId}
              />
              {session?.id === tweet?.userId && (
                <DeleteButton tweetId={tweetId} />
              )}
            </div>

            <span className="text-xs text-black">
              {new Date(`${tweet?.created_at}`).toLocaleDateString() +
                " " +
                new Date(`${tweet?.created_at}`).toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="h-0.5 bg-neutral-100" />
      </div>
      <div className="px-6">
        <TweetContent
          initialResponses={responses}
          tweetId={tweetId}
          user={tweet?.user!}
        />
      </div>
    </div>
  );
};

export default TweetDetail;
