"use client";

import { useState } from "react";

const Pagination = ({ totalCount }: { totalCount: number }) => {
  const length = Math.ceil(totalCount / 5);
  const [currentCount, setCurrentCount] = useState(1);

  const clickPage = async (item: number) => {
    setCurrentCount(item);
  };

  return (
    <div className="flex items-center gap-2 mx-auto">
      {Array.from({ length }, (_, i) => i + 1).map((item) => (
        <div
          onClick={() => clickPage(item)}
          className={item === currentCount ? `font-bold text-lg` : ""}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
