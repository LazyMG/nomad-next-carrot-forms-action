"use client";

import {
  checkUserPassword,
  editProfile,
} from "@/app/(home)/users/[username]/edit/actions";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constant";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormState } from "react-dom";

interface EditFormProp {
  user: {
    id: number;
    username: string;
    password: string;
    email: string;
    bio: boolean;
    created_at: Date;
    updated_at: Date;
  };
}

const EditForm = ({ user }: EditFormProp) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isBio, setIsBio] = useState(user.bio ?? false);

  const validateFormData = async (prev: any, formData: FormData) => {
    return await editProfile(formData, isBio, user.id);
  };

  const [validatedState, validateDispatch] = useFormState(
    validateFormData,
    null
  );

  const checkPassword = async (prev: any, formData: FormData) => {
    if (formData.get("password")?.toString() === "") {
      return {
        error: ["You should check your password."],
      };
    }
    const result = await checkUserPassword(formData, user.id);
    if (result) {
      setIsAuth(true);
      return {
        error: [],
      };
    } else {
      return {
        error: ["Wrong Password."],
      };
    }
  };

  const [checkState, checkDispatch] = useFormState(checkPassword, null);

  if (!isAuth) {
    return (
      <form action={checkDispatch} className="flex flex-col gap-3">
        <FormInput
          key={"checkPassword"}
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={checkState?.error}
          min={PASSWORD_MIN_LENGTH}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute top-3 left-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          }
        />
        <FormButton text="Check" />
      </form>
    );
  }

  return (
    <form action={validateDispatch} className="flex flex-col gap-3">
      <FormInput
        key={"editEmail"}
        name="email"
        type="email"
        placeholder={user.email}
        errors={validatedState?.fieldErrors.email}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-3 left-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        }
      />
      <FormInput
        name="username"
        type="text"
        placeholder={user.username}
        errors={validatedState?.fieldErrors.username}
        min={USERNAME_MIN_LENGTH}
        max={USERNAME_MAX_LENGTH}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-3 left-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        }
      />
      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        errors={validatedState?.fieldErrors.password}
        min={PASSWORD_MIN_LENGTH}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-3 left-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
        }
      />
      <FormInput
        name="passwordConfirm"
        type="password"
        placeholder="Password Confirm"
        errors={validatedState?.fieldErrors.passwordConfirm}
        min={PASSWORD_MIN_LENGTH}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-3 left-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
        }
      />
      <div className="w-full flex items-center gap-2">
        <div className="bg-white rounded-2xl px-2 h-12 flex items-center relative">
          <FingerPrintIcon className="size-7 absolute" />
          <span className="pl-8 px-1 select-none pointer-events-none">Bio</span>
        </div>
        <span
          onClick={() => {
            if (isBio) return;
            setIsBio(true);
          }}
          className={`h-12 flex items-center rounded-2xl text-lg font-semibold w-1/2 justify-center cursor-pointer transition-colors ease-in-out ${
            isBio
              ? "bg-green-700 text-white hover:bg-green-600"
              : "bg-white hover:bg-green-600 hover:text-white"
          }  `}
        >
          True
        </span>
        <span
          onClick={() => {
            if (!isBio) return;
            setIsBio(false);
          }}
          className={`h-12 flex items-center rounded-2xl text-lg font-semibold w-1/2 justify-center cursor-pointer transition-colors ease-in-out ${
            !isBio
              ? "bg-green-700 text-white hover:bg-green-600"
              : "bg-white hover:bg-green-600 hover:text-white"
          } `}
        >
          False
        </span>
      </div>

      <FormButton text="Edit" />
    </form>
  );
};

export default EditForm;
