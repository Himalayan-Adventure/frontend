"use client";
import PackagesList from "@/components/packagespage/packages-list";
import CommonBanner from "@/components/ui/common-banner";
import { Suspense, useState } from "react";
import serviceImg from "/public/images/travel.jpeg";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Heart, Menu, Mountain, Star } from "lucide-react";
import { IoBusiness } from "react-icons/io5";
import { FaPersonRays } from "react-icons/fa6";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { FaWalking } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaBox } from "react-icons/fa";

const tabsTriggers = [
  {
    icon: <Mountain className="size-5 md:size-6" />,
    name: "Trekking",
  },
  {
    icon: <FaWalking className="size-6 md:size-6" />,
    name: "Peak Climbing",
  },
  {
    icon: <FaWalking className="size-6 md:size-6" />,
    name: "Peak Climbing",
  },
  {
    icon: <FaWalking className="size-6 md:size-6" />,
    name: "Peak Climbing",
  },
  {
    icon: <FaWalking className="size-6 md:size-6" />,
    name: "Peak Climbing",
  },
];

const categoryTriggers = [
  {
    icon: <IoBusiness className="size-5 md:size-6" />,
    name: "Agency",
  },
  {
    icon: <FaPersonRays className="size-6 md:size-6" />,
    name: "Guide",
  },
  {
    icon: <FaBox className="size-6 md:size-6" />,
    name: "Packages",
  },
];
export function TopFilter() {
  return (
    <Tabs
      defaultValue="about"
      className="relative z-10 flex w-fit flex-row items-stretch gap-x-10 gap-y-10 shadow-xl lg:flex-row"
    >
      <TabsList className="hidden h-fit w-full flex-col items-stretch gap-x-10 gap-y-10 bg-transparent md:flex md:w-fit md:flex-row">
        <div
          className={cn(
            "hide-scrollbar relative flex h-fit w-full origin-top flex-row gap-y-2 overflow-x-scroll rounded-xl transition-transform ease-out md:w-full md:py-4",
          )}
        >
          {categoryTriggers.map((tab) => (
            <TabsTrigger
              key={`tab-${tab.name}`}
              value={tab.name}
              className="h-full capitalize data-[state=active]:!text-primary"
              asChild
            >
              <Button className="flex h-full w-full flex-col items-center gap-y-1 bg-white py-4 text-black hover:bg-white hover:text-primary md:h-fit md:p-4">
                {tab.icon}
                <Text
                  variant="text-lg"
                  className="text-sm leading-tight lg:text-sm"
                >
                  {tab.name}
                </Text>
              </Button>
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
    </Tabs>
  );
}
export function SideFilter() {
  const [hideTabs, setHideTabs] = useState(false);
  return (
    <Tabs
      defaultValue="about"
      className="relative z-10 flex flex-col items-stretch gap-x-10 gap-y-10 lg:flex-row"
    >
      <TabsList className="hidden h-fit w-full flex-col items-stretch gap-x-10 gap-y-10 bg-transparent md:flex md:w-fit md:flex-row">
        <div className="relative w-full">
          <div className="flex items-stretch gap-2 md:h-fit md:max-w-28 md:flex-col md:gap-4">
            <Button
              className="rouned-2xl flex h-auto w-fit flex-row items-center gap-x-1 gap-y-1 border border-gray-400 bg-white text-black shadow-2xl hover:bg-white hover:text-primary md:h-fit md:w-full"
              onClick={() => setHideTabs(!hideTabs)}
            >
              <MdOutlineCleaningServices size={48} />
              Services
            </Button>
            <div
              className={cn(
                hideTabs ? "scale-y-0" : "scale-y-100",
                "hide-scrollbar relative flex h-fit w-full origin-top flex-row gap-y-2 overflow-x-scroll rounded-xl transition-transform ease-out md:w-full md:flex-col md:py-4",
              )}
            >
              {tabsTriggers.map((tab) => (
                <TabsTrigger
                  key={`tab-${tab.name}`}
                  value={tab.name}
                  className="h-full capitalize data-[state=active]:!text-primary"
                  asChild
                >
                  <Button className="flex h-full w-full flex-col items-center gap-y-1 bg-white py-4 text-black hover:bg-white hover:text-primary md:h-fit md:p-4">
                    {tab.icon}
                    <Text
                      variant="text-lg"
                      className="text-sm leading-tight lg:text-sm"
                    >
                      {tab.name}
                    </Text>
                  </Button>
                </TabsTrigger>
              ))}
            </div>
          </div>
        </div>
      </TabsList>
    </Tabs>
  );
}
