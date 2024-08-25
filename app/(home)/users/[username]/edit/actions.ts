"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constant";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkPassword = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => {
  if (password === "" && passwordConfirm === "") {
    return true;
  } else {
    return password === passwordConfirm;
  }
};

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
    const session = await getSession();
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user && session?.id !== user.id) {
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
    const session = await getSession();
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user && session?.id !== user.id) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const checkUserPassword = async (formData: FormData, id: number) => {
  const password = formData.get("password")?.toString();

  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      password: true,
    },
  });

  if (!user) return false;

  const ok = await bcrypt.compare(password!, user.password ?? "xxxx");

  return ok;
};

interface CustomFormData {
  email: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  passwordConfirm: FormDataEntryValue | null;
}

const validateUserForm = async (userForm: CustomFormData, user: User) => {
  return {
    email: userForm.email === "" ? user.email : userForm.email,
    username: userForm.username === "" ? user.username : userForm.username,
    password: userForm.password === "" ? user.password : userForm.password,
    passwordConfirm:
      userForm.passwordConfirm === ""
        ? user.password
        : userForm.passwordConfirm,
  };
};

export const editProfile = async (
  formData: FormData,
  bio: boolean,
  id: number
) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const currentUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!currentUser) return;

  const newData = await validateUserForm(data, currentUser);

  const result = await formSchema.safeParseAsync(newData);

  if (!result.success) {
    return result.error.flatten();
  } else {
    //db 업데이트
    const ok = await bcrypt.compare(
      result.data.password,
      currentUser.password ?? "xxxx"
    );
    let hashedPassword;
    if (ok) {
      hashedPassword = result.data.password;
    } else {
      hashedPassword = await bcrypt.hash(result.data.password, 12);
    }

    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
        bio,
      },
      select: {
        id: true,
      },
    });
    revalidatePath(`/users/${user.id}/edit`);
    redirect("/profile");
  }
};
