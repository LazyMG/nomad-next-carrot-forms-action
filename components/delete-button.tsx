"use client";

import { deleteTweet } from "@/app/(home)/tweets/[id]/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteButton = ({ tweetId }: { tweetId: number }) => {
  const router = useRouter();
  const clickDeleteButton = async () => {
    //삭제 확인
    if (confirm("삭제하시겠습니까?")) {
      try {
        await deleteTweet(tweetId);
        router.push("/");
      } catch (error) {
        console.error("Failed to delete tweet:", error);
      }
    }
  };
  return (
    <button
      onClick={clickDeleteButton}
      className="flex items-center gap-2 text-sm rounded-full p-2 transition-colors shadow-sm bg-white border border-green-800 hover:bg-red-500 hover:text-white"
    >
      <TrashIcon className="size-5" />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
