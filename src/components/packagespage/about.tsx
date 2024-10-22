"use client";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function About({ desc }: { desc: BlocksContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex-grow font-overpass transition-all duration-300 ease-in-out">
      <div>
        <h1 className="text-lg font-[600] md:text-xl lg:text-2xl">
          About Expedition
        </h1>
        <p
          className={`mt-2 text-base lg:mt-3 lg:text-[16px] ${
            isExpanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          <BlocksRenderer content={desc} />
        </p>
        <button
          onClick={toggleExpansion}
          className="mt-2 flex items-center space-x-1 font-bold"
        >
          <span className="text-sm lg:text-base">
            {" "}
            {isExpanded ? "Read less" : "Read more"}
          </span>
          <span>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
        </button>
      </div>
    </div>
  );
}
