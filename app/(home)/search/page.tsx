"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { searchTweet } from "./actions";

import Tweet from "@/components/tweet";
import { Tweet as TweetType } from "@/lib/types";

const SearchContent = () => {
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
    <div className="flex flex-col gap-5 py-8 px-6">
      <div className="flex flex-col gap-1 font-semibold text-lg">
        <span>{keyword} 검색 결과</span>
      </div>
      <div className="h-0.5 bg-neutral-100" />
      {isLoading ? (
        <div className="flex justify-center text-4xl font-semibold pt-32 w-full text-center">
          Catching Tweets About {keyword}!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tweets?.length !== 0 ? (
            tweets?.map((tweet) => (
              <Tweet
                key={tweet.id}
                tweetDate={tweet.created_at}
                tweet={tweet.tweet}
                tweetId={tweet.id}
                tweetUser={tweet.user.username}
              />
            ))
          ) : (
            <div className="flex justify-center text-4xl font-semibold pt-32 text-center">
              No Tweet about {keyword}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Searchbar = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default Searchbar;
