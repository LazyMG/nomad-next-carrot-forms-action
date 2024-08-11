"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constant";

const checkPassword = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const formSchema = z
  .object({
    email: z
      .string({ required_error: "You should wrtie down your email." })
      .email({ message: "You should wirte down your email." })
      .toLowerCase(),
    username: z
      .string({ required_error: "You should wrtie down your username." })
      .min(USERNAME_MIN_LENGTH, { message: "That is too short!!!" })
      .max(USERNAME_MAX_LENGTH, { message: "That is too long!!!" }),
    password: z
      .string({ required_error: "You should wrtie down your password." })
      .min(PASSWORD_MIN_LENGTH, { message: "That is too short!!!" })
      .regex(PASSWORD_REGEX, {
        message:
          "A password must have letters, numbers and special characters.",
      }),
    passwordConfirm: z
      .string({
        required_error: "You should wrtie down password confirm.",
      })
      .min(PASSWORD_MIN_LENGTH, { message: "That is too short!!!" }),
  })
  .refine(checkPassword, {
    message: "Both passwords should be the same!",
    path: ["passwordConfirm"],
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        username: result.data.username,
      },
      select: {
        id: true,
      },
    });

    redirect("/log-in");
  }
};
