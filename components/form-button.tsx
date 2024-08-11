"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

const FormButton = ({ text }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="text-lg bg-gray-100 rounded-2xl h-12 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed hover:bg-gray-200"
    >
      {pending ? "Loading..." : text}
    </button>
  );
};

export default FormButton;
