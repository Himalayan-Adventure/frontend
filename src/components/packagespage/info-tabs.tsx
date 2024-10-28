"use client";

import React, { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { TInfoTabs } from "@/types/packages/info-tabs";
import { IDProperty } from "@/types/types";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface TabData {
  [key: string]: string[];
}
type TabContent =
  | (IDProperty & { description?: string | undefined })[]
  | (IDProperty & { description?: BlocksContent | undefined })
  | undefined;

// To simplify data display, separating the data type for lists and markdown
type ListType = {
  type: "list";
  data: { description: string | undefined }[];
  markdownData?: never;
};

type MarkdownType = {
  type: "markdown";
  markdownData: BlocksContent | undefined;
  data?: never;
};

type TformattedData = ListType | MarkdownType;

export type InfoTabsProp = Record<string, TabContent>;

export default function InfoTabs({ content }: { content: InfoTabsProp }) {
  const [activeTab, setActiveTab] = useState<TInfoTabs>("includes");
  // separating markdown from lists
  const getData = (tabData: TabContent): TformattedData => {
    if (Array.isArray(tabData)) {
      const data = tabData?.map((item) => ({
        description: item.description,
      }));
      return { type: "list", data };
    } else {
      console.log(tabData?.description);
      return { type: "markdown", markdownData: tabData?.description };
    }
  };

  return (
    <div className="relative">
      <div className="border-b border-gray-200 pb-4">
        {/* Tab Headers*/}
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

      {/* Tab Contents*/}
      <div className="pt-6 [&>*]:list-disc">
        <h2 className="font-semibold capitalize lg:text-[20px]">{activeTab}</h2>
        <ul className="mt-4 space-y-4">
          {activeTab === "includes" || activeTab === "excludes" ? (
            !getData(content[activeTab])?.data ? (
              <p>No content available</p>
            ) : (
              getData(content[activeTab])?.data?.map((i, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-500">
                    <IoCheckmarkCircleOutline className="text-primary lg:text-2xl" />
                  </span>

                  <span className="text-sm text-gray-700 md:text-base">
                    {i.description}
                  </span>
                </li>
              ))
            )
          ) : !getData(content[activeTab]).markdownData ? (
            <p>No content available</p>
          ) : (
            <div className="prose lg:prose-xl">
              <BlocksRenderer
                content={getData(content[activeTab]).markdownData || []}
              />
            </div>
          )}
        </ul>
      </div>
      <Separator className="relative mt-6 h-px w-full bg-gray-200" />
    </div>
  );
}
