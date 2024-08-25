"use client";

import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import SearchForm from "./search-form";

import { usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const NavHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isBack =
    pathname.substring(1).split("/")[0] === "tweets" ||
    pathname.substring(1).split("/")[0] === "users";

  const clickBackButton = () => {
    router.back();
  };

  return (
    <div
      className="fixed flex items-center top-0 w-full mx-auto max-w-screen-sm h-14 z-10 bg-white px-5"
      style={{
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex justify-between items-center w-full relative">
        {pathname === "/" ? (
          <SearchForm />
        ) : (
          <span className="cursor-pointer" onClick={clickBackButton}>
            <ArrowLeftIcon className="size-6" />
          </span>
        )}
        <div className="text-2xl font-semibold">Tweets!</div>
        <Link href="/profile">
          <UserCircleIcon className="size-7 text-green-600" />
        </Link>
      </div>
    </div>
  );
};

export default NavHeader;
