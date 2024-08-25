"use client";

import { InitialTweets } from "@/app/(home)/page";
import { getMoreTweets } from "@/app/(home)/actions";
import Tweet from "./tweet";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

interface TweetListProps {
  tweets: InitialTweets;
  setTweets: React.Dispatch<React.SetStateAction<InitialTweets>>;
}

const TweetList = ({ tweets, setTweets }: TweetListProps) => {
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
    <div className="flex flex-col gap-4 relative pt-8">
      <div className="flex flex-col gap-4 px-12">
        {tweets?.length !== 0 ? (
          tweets.map((tweet) => (
            <Tweet
              tweet={tweet.tweet}
              tweetId={tweet.id}
              tweetUser={tweet.user.username}
              tweetDate={tweet.created_at.toISOString()}
              key={tweet.id}
            />
          ))
        ) : (
          <div className="flex flex-col pt-28 gap-2 items-center text-4xl font-semibold">
            <span>No Tweets.</span>
            <span>Please Add New Tweet!</span>
          </div>
        )}
      </div>
      <div className="absolute w-full top-0">
        <div className="flex justify-between items-center">
          <span onClick={prevPage} className="cursor-pointer">
            <ArrowLongLeftIcon className="size-9" />
          </span>
          <span onClick={nextPage} className="cursor-pointer">
            <ArrowLongRightIcon className="size-9" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TweetList;
