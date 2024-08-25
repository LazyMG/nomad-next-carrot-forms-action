"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { searchTweet } from "./actions";

import Tweet from "@/components/tweet";
import { Tweet as TweetType } from "@/lib/types";

const Search = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [tweets, setTweets] = useState<TweetType[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getSearchTweets = async (keyword: string) => {
    const searchedTweets = await searchTweet(keyword);
    setTweets(searchedTweets);
  };

  useEffect(() => {
    getSearchTweets(keyword);
    setIsLoading(false);
  }, [keyword]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-5 py-8 px-6">
        <div className="flex flex-col gap-1 font-semibold text-lg">
          <span>{keyword} 검색 결과</span>
        </div>
        <div className="h-0.5 bg-neutral-100" />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            {tweets?.map((tweet) => (
              <Tweet
                key={tweet.id}
                tweetDate={tweet.created_at}
                tweet={tweet.tweet}
                tweetId={tweet.id}
                tweetUser={tweet.user.username}
              />
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Search;
