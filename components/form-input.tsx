import React, { InputHTMLAttributes } from "react";

interface FormInputProps {
  errors?: string[];
  name: string;
  icon: React.ReactNode;
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
        className="pl-10 text-lg bg-transparent rounded-2xl w-full h-12 focus:outline-none ring-2 focus:ring- transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {icon}
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default FormInput;
