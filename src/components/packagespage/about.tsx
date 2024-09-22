"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function About({ desc }: { desc?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    desc && (
      <div className="flex-grow transition-all duration-300 ease-in-out">
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
            className="mt-2 flex items-center space-x-1 font-bold"
          >
            <span> {isExpanded ? "Read less" : "Read more"}</span>
            <span>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
          </button>
        </div>
      </div>
    )
  );
}
