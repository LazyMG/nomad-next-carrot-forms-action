"use client";

import { useOptimistic } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { disLikeTweet, likeTweet } from "@/app/(home)/tweets/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

const LikeButton = ({ isLiked, likeCount, tweetId }: LikeButtonProps) => {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await disLikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };

  return (
    <form action={onClick}>
      <button
        className={`flex items-center gap-2  text-sm border border-green-800 rounded-full p-2 transition-colors shadow-sm  ${
          state.isLiked
            ? "bg-green-800 text-white border-green-700 hover:bg-white hover:text-green-800"
            : "bg-white hover:bg-green-800 hover:text-white"
        }`}
      >
        {state.isLiked ? (
          <HandThumbUpIcon className="size-5" />
        ) : (
          <OutlineHandThumbUpIcon className="size-5" />
        )}
        {state.isLiked ? (
          <span>{state.likeCount}</span>
        ) : (
          <span>Like ({state.likeCount})</span>
        )}
      </button>
    </form>
  );
};

export default LikeButton;
