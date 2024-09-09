"use client";
import React, { useState } from "react";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h1 className="text-lg font-[600] md:text-xl lg:text-2xl">
        About Expedition
      </h1>
      <p
        className={`mt-2 text-base lg:mt-3 lg:text-[16px] ${
          isExpanded ? "line-clamp-none" : "line-clamp-3"
        }`}
      >
        Everest Expedition is the most sought-after expedition by people all
        around the globe. Millions of people have dreams to climb Mount Everest
        but only half of them find success. Climbing and summiting Mount Everest
        is incredibly inspiring and a matter of personal status and prestige.
        Standing on the top of the world and gazing at the view of Mt. Lhotse,
        Mt Makalu, and many other beautiful peaks is beyond human imagination
        and inexpressive. Hence, better planning, well preparation, training and
        right selection of the organizing company is a must.
      </p>
      <button
        onClick={toggleExpansion}
        className="mt-2 border rounded-lg border-black hover:bg-gray-200 px-4 py-1 block"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
