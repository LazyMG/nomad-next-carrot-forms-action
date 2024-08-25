"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";

const SearchForm = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [inputClass, setInputClass] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!isSearchOpen) {
      event.preventDefault();
      setIsSearchOpen(true);
    }
    if (formRef.current?.getElementsByTagName("input")[0]?.value === "")
      event.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        if (isSearchOpen) {
          setInputClass("animate-slide-out");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleAnimationEnd = () => {
    if (inputClass === "animate-slide-out") {
      setIsSearchOpen(false);
      setInputClass("");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className="flex items-center relative w-6"
      action={"/search"}
    >
      <button className="absolute left-1 z-10 size-6">
        <MagnifyingGlassIcon
          className={`${isSearchOpen ? "text-green-600" : ""}`}
        />
      </button>
      {isSearchOpen && (
        <input
          name="keyword"
          className={`h-7 w-48 pl-8 ${
            inputClass ? inputClass : "animate-slide-in"
          } text-green-600 placeholder:text-green-400`}
          type="text"
          placeholder="What do you find?"
          onAnimationEnd={handleAnimationEnd}
        />
      )}
    </form>
  );
};

export default SearchForm;
