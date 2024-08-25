import Link from "next/link";
import React from "react";

interface TweetProp {
  tweetId: number;
  tweet: string;
  tweetUser: string;
  tweetDate: Date;
}

const Tweet = ({ tweet, tweetId, tweetUser, tweetDate }: TweetProp) => {
  return (
    <Link
      href={`/tweets/${tweetId}`}
      className="text-lg bg-green-50 rounded-2xl max-h-32 p-3 shadow-xl select-none"
    >
      <div className="flex flex-col justify-between h-full">
        <span className="text-xl w-full overflow-hidden">
          {tweet.length >= 90 ? tweet.slice(0, 86) + "..." : tweet}
        </span>
        <div className="flex justify-between  text-neutral-500 mt-2">
          <span className="text-xs">
            {tweetDate.toLocaleDateString() +
              " " +
              tweetDate.toLocaleTimeString()}
          </span>
          <span className="text-sm">{tweetUser}</span>
        </div>
      </div>
    </Link>
  );
};

export default Tweet;
