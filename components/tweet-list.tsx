"use client";

import Link from "next/link";
import Pagination from "./pagination";
import { InitialTweets } from "@/app/(home)/page";
import { useState } from "react";
import { getMoreTweets } from "@/app/(home)/actions";

interface TweetListProps {
  initialTweets: InitialTweets;
  totalCount: number;
}

const TweetList = ({ initialTweets, totalCount }: TweetListProps) => {
  const [tweets, setTweets] = useState(initialTweets);
  const length = Math.ceil(totalCount / 5);

  const prevPage = async () => {
    const cusorId = tweets[0]?.id;
    const newTweets = await getMoreTweets(cusorId, 5, true);
    if (newTweets.length === 0) return;
    setTweets(newTweets);
  };

  const nextPage = async () => {
    const cusorId = tweets[4]?.id;
    if (!cusorId) return;
    const newTweets = await getMoreTweets(cusorId, 5, false);
    setTweets(newTweets);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {tweets.map((tweet) => (
          <Link
            href={`/tweets/${tweet.id}`}
            key={tweet.id}
            className="text-lg bg-gray-100 rounded-2xl max-h-32 p-3"
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-xl">
                {tweet.tweet.length >= 90
                  ? tweet.tweet.slice(0, 86) + "..."
                  : tweet.tweet}
              </span>
              <div className="flex justify-between text-sm text-neutral-500 mt-2">
                <span>{tweet.created_at.toLocaleDateString()}</span>
                <span>{tweet.user.username}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 mx-auto cursor-pointer">
        <span onClick={prevPage}>&larr;</span>
        <span onClick={nextPage}>&rarr;</span>
      </div>
    </>
  );
};

export default TweetList;
