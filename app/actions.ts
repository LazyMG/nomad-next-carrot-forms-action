"use server";

import { userData } from "@/lib/localDB";
import { z } from "zod";

const emailPattern = new RegExp("@zod\\.com$");
const numberPattern = new RegExp("\\d+");

const checkEmailExists = (email: string) => {
  const exists = userData.email === email;
  return exists;
};

const checkUsernameExists = (username: string) => {
  const exists = userData.username === username;
  return exists;
};

const formSchema = z.object({
  email: z
    .string({ message: "You should wrtie down your email." })
    .email()
    .toLowerCase()
    .regex(emailPattern, { message: "Only @zod.com emails are allowed." })
    .refine(checkEmailExists, "An account with this email does not exitst."),
  username: z
    .string({ message: "You should wrtie down your username." })
    .min(5, { message: "Username should be at least 5 characters long." })
    .refine(
      checkUsernameExists,
      "An account with this username does not exitst."
    ),
  password: z
    .string({ message: "You should wrtie down your password." })
    .min(10, { message: "Password should be at least 10 characters long." })
    .regex(numberPattern, {
      message: "Password should contain at least one number (0123456789).",
    }),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParse(data);

  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (!result.success) {
    return {
      ...result.error.flatten(),
      success: false,
    };
  } else {
    const ok = userData.password === data.password;

    if (!ok) {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
          username: [],
        },
        success: false,
      };
    } else {
      return {
        fieldErrors: {
          password: [],
          email: [],
          username: [],
        },
        success: true,
      };
    }
  }
};
