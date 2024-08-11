"use server";

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constant";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import sessionLogin from "@/lib/login";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const checkUsernameExists = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({ required_error: "You should wrtie down your email." })
    .email({ message: "You should wirte down your email." })
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exitst."),
  username: z
    .string({ required_error: "You should wrtie down your username." })
    .min(USERNAME_MIN_LENGTH, {
      message: `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`,
    })
    .max(USERNAME_MAX_LENGTH, { message: "That is too long!!!" })
    .refine(
      checkUsernameExists,
      "An account with this username does not exitst."
    ),
  password: z
    .string({ required_error: "You should wrtie down your password." })
    .min(PASSWORD_MIN_LENGTH, {
      message: `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`,
    }),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    if (!user) {
      return {
        fieldErrors: {
          password: ["Can't find User."],
          email: [],
          username: [],
        },
      };
    }

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );

    if (ok) {
      await sessionLogin(user.id);
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
          username: [],
        },
      };
    }
  }
};
