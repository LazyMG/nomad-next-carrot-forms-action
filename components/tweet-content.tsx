"use client";

import React, { useOptimistic, useState } from "react";
import { TweetResponse } from "@/lib/types";
import { TEXTAREA_MAX_LENGTH } from "@/lib/constant";
import { uploadResponse } from "./reponse-actions";
import Link from "next/link";

const TweetContent = ({
  initialResponses,
  tweetId,
  user,
}: {
  initialResponses: TweetResponse[];
  tweetId: number;
  user: { username: string; id: number };
}) => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [state, reducerFn] = useOptimistic(
    { initialResponses },
    (prevState, payload) => ({
      initialResponses: [
        {
          id: Date.now(),
          payload: response,
          created_at: new Date(),
          updated_at: new Date(),
          userId: user.id,
          tweetId,
          user: {
            username: user.username,
          },
        },
        ...prevState.initialResponses,
      ],
    })
  );

  const changeResponse = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.currentTarget.value);
  };

  const formAction = async () => {
    if (response === "") {
      setError("Write down your response!");
    }
    if (response.length > TEXTAREA_MAX_LENGTH) {
      setError("Too long!");
    }
    setIsLoading(true);
    reducerFn(undefined);
    setResponse("");
    const result = await uploadResponse(response, tweetId);
    if (result.result) {
      setIsLoading(false);
      setError("");
    }
  };

  return (
    <div className="pb-5 flex flex-col gap-2">
      <form action={formAction} className="flex flex-col gap-2 mb-3">
        <textarea
          name="response"
          value={response}
          onChange={changeResponse}
          className={`pl-5 py-2 text-lg shadow-md bg-white rounded-2xl w-full focus:outline-gray-300 ring-2 focus:ring-offset-2 transition ring-neutral-200 focus:ring-gray-400 border-none placeholder:text-neutral-400 resize-none ${
            error !== ""
              ? "ring-red-200 focus:ring-red-400 focus:outline-red-300"
              : ""
          }`}
          placeholder={`How are you? (MAX ${TEXTAREA_MAX_LENGTH} characters)`}
          rows={3}
          maxLength={TEXTAREA_MAX_LENGTH}
          required
        />
        {error !== "" && (
          <span className="text-red-500 font-medium">{error}</span>
        )}
        <button
          disabled={isLoading}
          className="text-lg bg-gray-100 rounded-2xl h-12 shadow-md disabled:bg-green-700 disabled:text-neutral-100 disabled:cursor-not-allowed hover:bg-green-200"
        >
          {isLoading ? "Loading..." : "Upload"}
        </button>
      </form>
      <div className="flex flex-col gap-2">
        {state.initialResponses.map((response) => (
          <div
            className="flex flex-col p-3 rounded-lg  bg-green-50 shadow-md"
            key={response.id}
          >
            <div className="flex justify-between items-end">
              <span className="text-lg">{response.payload}</span>
              <Link href={`/users/${response.userId}`}>
                <span className="text-md text-neutral-100">
                  {response.user.username}
                </span>
              </Link>
            </div>
            <span className="text-xs text-right">
              {new Date(`${response.created_at}`).toLocaleDateString() +
                " " +
                new Date(`${response.created_at}`).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetContent;
