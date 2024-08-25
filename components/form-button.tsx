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
      className="text-lg bg-neutral-100  rounded-2xl h-12 shadow-md disabled:bg-green-700 disabled:text-neutral-100 disabled:cursor-not-allowed hover:bg-green-200 transition-colors ease-in-out"
    >
      {pending ? "Loading..." : text}
    </button>
  );
};

export default FormButton;
