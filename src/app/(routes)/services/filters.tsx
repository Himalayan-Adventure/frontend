"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Blocks, Mountain } from "lucide-react";
import { IoBusiness } from "react-icons/io5";
import { FaPersonRays } from "react-icons/fa6";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { FaWalking } from "react-icons/fa";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaBox, FaMountain } from "react-icons/fa";
import { GiMountainRoad } from "react-icons/gi";

import { PiMountainsFill } from "react-icons/pi";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getServiceCategories } from "@/server/services/get-services-categories";
import DynamicReactIcon from "@/components/icons/strapi-icon";
import { TServiceType, useServiceType } from "@/store/get-service-type";
// const tabsTriggers = [
//   {
//     icon: <Mountain className="size-5 md:size-6" />,
//     name: "Trekking",
//     value: "trekking",
//     key: "",
//   },
//   {
//     icon: <FaWalking className="size-6 md:size-6" />,
//     name: "Peak Climbing",
//     value: "trekking",
//     key: "",
//   },
//   {
//     icon: <FaMountain className="size-6 md:size-6" />,
//     name: "Expeditions 8000m",
//     value: "8000",
//     key: "",
//   },
//   {
//     icon: <PiMountainsFill className="size-6 md:size-6" />,
//     name: "Expeditions 7000m",
//     value: "7000",
//     key: "",
//   },
//   {
//     icon: <GiMountainRoad className="size-6 md:size-6" />,
//     name: "Expeditions 6000m",

//     value: "8000",
//     key: "",
//   },
// ];

const categoryTriggers = [
  // {
  //   icon: <IoBusiness className="size-5 md:size-6" />,
  //   name: "Agency",
  //   value: "agency",
  // },
  {
    icon: <FaPersonRays className="size-6 md:size-6" />,
    name: "Guide",
    value: "guides",
  },
  {
    icon: <FaBox className="size-6 md:size-6" />,
    name: "Packages",
    value: "packages",
  },
];
export function TopFilter() {
  const { type, setType } = useServiceType();
  const searchParams = useSearchParams();
  const updateQueryString = useUpdateQueryString();
  useEffect(() => {
    if (searchParams.get("type")) {
      setType(searchParams.get("type") as TServiceType);
    }
  }, []);
  return (
    <Tabs
      defaultValue={(searchParams.get("type") as TServiceType) || "guides"}
      value={type}
      className="relative z-10 flex w-fit flex-row items-stretch p-0 md:left-36"
    >
      <TabsList className="hide-scrollbar relative flex h-fit w-full origin-top flex-row items-stretch gap-x-4 gap-y-10 overflow-x-scroll rounded-xl bg-background p-0 px-10 shadow-2xl transition-transform ease-out md:w-fit md:flex-row">
        {categoryTriggers.map((tab) => (
          <TabsTrigger
            key={`tab-${tab.name}`}
            value={tab.value}
            className="h-full capitalize data-[state=active]:!text-primary"
            onClick={() => {
              setType(tab.value as TServiceType);
              updateQueryString({ type: tab.value }, ["name", "service-name",'limit','page']);
            }}
            asChild
          >
            <Button className="flex h-full w-full flex-col items-center gap-y-1 bg-white py-4 text-black hover:bg-white hover:text-primary md:h-fit md:p-4">
              {tab.icon}
              <Text
                variant="text-lg"
                className="text-xs leading-none md:text-sm lg:text-sm"
                bold
              >
                {tab.name}
              </Text>
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
export function SideFilter() {
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";
  const { data, isPending } = useQuery({
    queryKey: ["service-categories"],
    queryFn: async () => await getServiceCategories(),
    placeholderData: keepPreviousData,
  });
  const categories = useMemo(() => data, [data]);
  const handleValueChange = useCallback(
    (value: string) => {
      if (value !== "All") {
        updateQueryString({ category: value });
      } else {
        updateQueryString({}, ["category"]);
      }
    },
    [updateQueryString],
  );

  return (
    <Tabs
      value={category}
      onValueChange={handleValueChange}
      className="relative z-10 flex flex-col items-stretch gap-x-10 gap-y-10 lg:flex-row"
    >
      <TabsList className="flex h-fit w-full flex-col items-stretch gap-x-10 gap-y-10 bg-transparent md:w-fit md:flex-row">
        <div className="relative w-full">
          <div className="flex items-stretch gap-2 md:h-fit md:max-w-28 md:flex-col md:gap-4">
            <Button
              className="rouned-2xl flex h-auto w-fit flex-row items-center gap-x-1 gap-y-1 border border-gray-400 bg-white text-black shadow-2xl hover:bg-white hover:text-primary md:h-fit md:w-full"
              //            onClick={() => setHideTabs(!hideTabs)}
            >
              <MdOutlineCleaningServices />
              Services
            </Button>
            <div
              className={cn(
                "hide-scrollbar relative flex h-fit w-full origin-left flex-row gap-y-2 overflow-x-scroll rounded-xl bg-white transition-transform ease-out md:w-full md:origin-top md:flex-col md:py-4",
              )}
            >
              <TabsTrigger
                value="All"
                className="relative h-auto capitalize data-[state=active]:!text-primary"
                asChild
              >
                <Button className="flex h-auto w-full flex-col items-center gap-y-1 bg-white text-black hover:bg-white hover:text-primary md:h-fit md:p-4 md:py-4">
                  <Blocks className="size-5 lg:size-8" />
                  <Text
                    variant="text-lg"
                    className="text-xs leading-none md:text-sm lg:text-sm"
                    bold
                  >
                    All
                  </Text>
                </Button>
              </TabsTrigger>
              {!isPending &&
                categories?.data &&
                categories?.data.length > 0 &&
                categories.data?.map((category) => (
                  <TabsTrigger
                    key={`tab-${category.id}`}
                    value={category.attributes.name}
                    className="relative h-auto capitalize data-[state=active]:!text-primary"
                    asChild
                  >
                    <Button className="flex h-auto w-full flex-col items-center gap-y-1 bg-white text-black hover:bg-white hover:text-primary md:h-fit md:p-4 md:py-4">
                      {category.attributes.icon && (
                        <DynamicReactIcon
                          className="size-5 lg:size-8"
                          name={category.attributes.icon}
                        />
                      )}
                      <Text
                        variant="text-lg"
                        className="text-xs leading-none md:text-sm lg:text-sm"
                        bold
                      >
                        {category.attributes.name}
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
