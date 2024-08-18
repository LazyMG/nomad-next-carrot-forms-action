"use client";

import { useOptimistic } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { disLikeTweet, likeTweet } from "@/app/tweets/[id]/actions";

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
        className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors hover:text-white ${
          state.isLiked
            ? "bg-green-700 text-white border-green-700"
            : "hover:bg-neutral-400 "
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
