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
  | (IDProperty & Omit<{ description?: string | undefined } & {}, never>[])
  | (IDProperty &
      Omit<
        {
          description?: BlocksContent | undefined;
        } & { title: string },
        never
      >[])
  | undefined
  | undefined;

export type InfoTabsProp = Record<string, TabContent>;

export default function InfoTabs({
  content,
}: {
  //  readonly content: Record<TInfoTabs, BlocksContent | undefined>;
  content: InfoTabsProp;
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
  const getData = (tabData: TabContent) => {
    return tabData?.map((item) => ({
      description: item.description,
    }));
  };

  return (
    <div className="relative">
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
        {/*        {content?.[activeTab] && content?.[activeTab] !== undefined ? (
          <BlocksRenderer content={content[activeTab] as []} />
        ) : (
          <p>No content found</p>
        )}*/}
        <h2 className="font-semibold capitalize lg:text-[20px]">{activeTab}</h2>
        <ul className="mt-4 space-y-4">
          {content[activeTab] &&
            getData(content[activeTab] || [])?.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-yellow-500">
                  <IoCheckmarkCircleOutline className="text-primary lg:text-2xl" />
                </span>

                {typeof item?.description === "string" ? (
                  <span className="text-sm text-gray-700 md:text-base">
                    {item.description}
                  </span>
                ) : (
                  <BlocksRenderer content={item.description || []} />
                )}
              </li>
            ))}
        </ul>
      </div>
      <Separator className="relative mt-6 h-px w-full bg-gray-200" />
    </div>
  );
  // return <BlocksRenderer content={content} />;
}
