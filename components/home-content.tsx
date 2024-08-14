"use client";

import { InitialTweets } from "@/app/(home)/page";
import AddTweet from "./add-tweet";
import TweetList from "./tweet-list";
import { useState } from "react";

interface TweetListProps {
  initialTweets: InitialTweets;
}

const HomeContent = ({ initialTweets }: TweetListProps) => {
  const [tweets, setTweets] = useState(initialTweets);
  return (
    <>
      <AddTweet setTweets={setTweets} />
      <TweetList tweets={tweets} setTweets={setTweets} />
    </>
  );
};

export default HomeContent;
