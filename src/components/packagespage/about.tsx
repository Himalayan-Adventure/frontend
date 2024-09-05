"use client";
import React, { useState } from "react";

export default function About({ desc }: { desc?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    desc && (
      <div>
        <h1 className="text-lg font-[600] md:text-xl lg:text-2xl">
          About Expedition
        </h1>
        <p
          className={`mt-2 text-base lg:mt-3 lg:text-[16px] ${
            isExpanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {desc}
        </p>
        <button
          onClick={toggleExpansion}
          className="mt-2 block rounded-lg border border-black px-4 py-1 hover:bg-gray-200"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </div>
    )
  );
}
