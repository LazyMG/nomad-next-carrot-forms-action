"use client";

import { useFormState } from "react-dom";
import FormButton from "./form-button";
import { uploadTweet } from "./tweet-actions";
import { InitialTweets } from "@/app/(home)/page";
import { TextareaHTMLAttributes, useState } from "react";

interface AddTweetProps {
  setTweets: React.Dispatch<React.SetStateAction<InitialTweets>>;
}

const AddTweet = ({ setTweets }: AddTweetProps) => {
  const [tweetText, setTweetText] = useState("");
  const [state, dispatch] = useFormState(
    async (prevState: any, formData: FormData) => {
      const result = await uploadTweet(prevState, formData);
      if (result?.success) {
        setTweets(result.tweets!);
        setTweetText("");
        return {};
      } else {
        return {
          formErrors: result.formErrors || [],
        };
      }
    },
    null
  );
  return (
    <form action={dispatch} className="flex flex-col gap-3">
      <div className="relative flex flex-col gap-2">
        <textarea
          name="tweet"
          value={tweetText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTweetText(event.currentTarget.value);
          }}
          className={`pl-5 py-2 text-lg bg-transparent rounded-2xl w-full focus:outline-gray-300 ring-2 focus:ring-offset-2 transition ring-neutral-200 focus:ring-gray-400 border-none placeholder:text-neutral-400 resize-none ${
            state?.formErrors && state?.formErrors?.length > 0
              ? "ring-red-200 focus:ring-red-400 focus:outline-red-300"
              : ""
          }`}
          placeholder="What's going on? (MAX 50 characters)"
          rows={5}
        />
        {state?.formErrors?.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
      </div>
      <FormButton text="Upload" />
    </form>
  );
};

export default AddTweet;
