"use client";

import React, { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface TabData {
  [key: string]: string[];
}

const tabData: TabData = {
  Includes: [
    "International and domestic airport transfers.",
    "4 Nights hotel accommodation in Kathmandu.",
    "A welcome dinner in a typical Nepali restaurant in Kathmandu.",
    "Both-ways domestic flight: Kathmandu – Lukla – Kathmandu.",
    "Land and Air domestic transportation and cargo for our overall expedition crew.",
  ],
  Excludes: [
    "Travel insurance.",
    "Nepal entry visa fee.",
    "International airfare and departure tax.",
    "Personal expenses (like drinks, laundry, telephone, etc.).",
    "Tips for guide and porters.",
  ],
};

export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabData>("Includes");

  return (
    <div className="">
      <div className="border-b border-gray-200 pb-4">
        <nav className="flex space-x-8" aria-label="Tabs">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 px-1 py-1 text-sm font-medium lg:text-base`}
              onClick={() => setActiveTab(tab as keyof typeof tabData)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-6">
        <h2 className="font-semibold lg:text-[20px]">{activeTab}</h2>
        <ul className="mt-4 space-y-4">
          {(tabData[activeTab] || []).map((item: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-yellow-500">
                <IoCheckmarkCircleOutline className="text-primary lg:text-2xl" />
              </span>
              <span className="text-gray-700 text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
