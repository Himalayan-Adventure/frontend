"use client";

import React, { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { TInfoTabs } from "@/types/packages/info-tabs";

interface TabData {
  [key: string]: string[];
}

export default function InfoTabs({
  content,
}: {
  readonly content: Record<TInfoTabs, BlocksContent | undefined>;
}) {
  // const tabData: TabData = {
  //   Includes: content.includes,
  //       Excludes: [
  //     "Travel insurance.",
  //     "Nepal entry visa fee.",
  //     "International airfare and departure tax.",
  //     "Personal expenses (like drinks, laundry, telephone, etc.).",
  //     "Tips for guide and porters.",
  //   ],
  // };
  const [activeTab, setActiveTab] = useState<TInfoTabs>("includes");

  return (
    <div className="">
      <div className="border-b border-gray-200 pb-4">
        <nav className="flex space-x-8" aria-label="Tabs">
          {Object.keys(content).map((tab) => (
            <button
              key={tab}
              className={`${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 px-1 py-1 text-sm font-medium capitalize lg:text-base`}
              onClick={() => setActiveTab(tab as TInfoTabs)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-6 [&>*]:list-disc">
        {content?.[activeTab] && content?.[activeTab] !== undefined ? (
          <BlocksRenderer content={content[activeTab] as []} />
        ) : (
          <p>No content found</p>
        )}
        {/* <h2 className="font-semibold lg:text-[20px]">{activeTab}</h2>
        <ul className="mt-4 space-y-4">
          {(content[activeTab] || []).map((item: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-yellow-500">
                <IoCheckmarkCircleOutline className="text-primary lg:text-2xl" />
              </span>
              <span className="text-sm text-gray-700 md:text-base">{item}</span>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
  // return <BlocksRenderer content={content} />;
}
