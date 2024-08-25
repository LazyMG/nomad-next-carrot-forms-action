import React, { InputHTMLAttributes } from "react";

interface FormInputProps {
  errors?: string[];
  name: string;
  icon?: React.ReactNode;
}

const FormInput = ({
  errors = [],
  name,
  icon,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative flex flex-col gap-2">
      <input
        name={name}
        className={`pl-10 text-lg bg-white rounded-2xl w-full h-12  focus:outline-gray-300 ring-2 focus:ring-offset-2 transition ring-neutral-200 focus:ring-gray-400 border-none placeholder:text-neutral-400 shadow-md ${
          errors.length !== 0
            ? "ring-red-200 focus:ring-red-400 focus:outline-red-300"
            : ""
        }`}
        {...rest}
      />
      {icon}
      {errors.map((error, index) => (
        <span key={index} className="text-red-600 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default FormInput;
