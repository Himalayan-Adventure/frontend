"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PackageCard from "./package-card";
import { packages } from "@/data/packagesData";
import { FaBorderAll, FaIcons } from "react-icons/fa"; // Import any icon from react-icons
import { Text } from "../ui/text";
import { getPackages } from "@/server/packages/get-packages";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { PackageCardSkeleton } from "./package-card-skeleton";
import {
  FaSnowflake,
  FaLeaf,
  FaSun,
  FaMountain,
  FaWalking,
  FaSkull,
  FaStarHalfAlt,
  FaStar,
} from "react-icons/fa";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { useSearchParams } from "next/navigation";

export default function PackagesList() {
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    key: string;
  }>({ name: "All", key: "none" });
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::package.package">
  >({
    queryKey: ["packages", searchParams, selectedCategory],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.set("populate", "*");
        searchParams.forEach((value, key) => {
          params.set(key, value.toLowerCase());
        });

        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?${params.toString()}`,
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
  });

  const [filters, setFilters] = useState();
  const [filteredPackages, setFilteredPackages] = useState<
    APIResponseCollection<"api::package.package"> | null | undefined
  >(null);

  useEffect(() => {
    if (data) {
      setFilteredPackages(data);
    }
  }, [data]);

  const categories: Array<{
    name: string;
    key: "none" | "altitude" | "season" | "type" | "grade";
    icon: JSX.Element;
  }> = [
    {
      name: "All",
      key: "none",
      icon: <FaBorderAll className="size-6 md:size-8" />,
    },

    {
      name: "Trekking",
      key: "type",
      icon: <FaWalking className="size-6 md:size-8" />,
    },
    {
      name: "Peak Climbing",
      key: "type",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      name: "Expeditions 8000m",
      key: "altitude",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      name: "Expeditions 7000m",

      key: "altitude",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      name: "Expeditions 6000m",
      key: "altitude",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      name: "Winter",
      key: "season",
      icon: <FaSnowflake className="size-6 md:size-8" />,
    },
    {
      name: "Spring",
      key: "season",
      icon: <FaLeaf className="size-6 md:size-8" />,
    },
    {
      name: "Summer",
      key: "season",
      icon: <FaSun className="size-6 md:size-8" />,
    },
    {
      name: "Autumn",
      key: "season",
      icon: <FaLeaf className="size-6 md:size-8" />,
    },
    {
      name: "Beginner",
      key: "season",
      icon: <FaSkull className="size-6 md:size-8" />,
    },
    {
      name: "Intermediate",
      key: "grade",
      icon: <FaStarHalfAlt className="size-6 md:size-8" />,
    },
    {
      name: "Experienced",

      key: "grade",
      icon: <FaStar className="size-6 md:size-8" />,
    },
    {
      name: "Elite",
      key: "type",
      icon: <FaIcons className="size-6 md:size-8" />,
    },
    {
      name: "Premium",
      key: "type",
      icon: <FaIcons className="size-6 md:size-8" />,
    },
    {
      name: "Basic",
      key: "type",
      icon: <FaIcons className="size-6 md:size-8" />,
    },
  ];
  // useEffect(() => {
  //   switch (selectedCategory) {
  //     case "none": {
  //       setFilteredPackages(data);
  //       break;
  //     }
  //     case "type": {
  //       setFilteredPackages(
  //         data?.data
  //           //@ts-ignore
  //           ?.filter((pkg) => pkg.attributes?.type === selectedCategory),
  //       );
  //       break;
  //     }
  //     case "grade": {
  //       setFilteredPackages(
  //         data?.data
  //           //@ts-ignore
  //           ?.filter((pkg) => pkg.attributes?.grade === selectedCategory),
  //       );
  //       break;
  //     }
  //     case "season": {
  //       setFilteredPackages(
  //         data?.data
  //           //@ts-ignore
  //           ?.filter((pkg) => pkg.attributes?.season === selectedCategory),
  //       );
  //       break;
  //     }
  //     case "altitude": {
  //       setFilteredPackages(
  //         data?.data
  //           //@ts-ignore
  //           ?.filter((pkg) => pkg.attributes?.altitude === selectedCategory),
  //       );
  //       break;
  //     }
  //     default: {
  //       setFilteredPackages(data?.data);
  //       break;
  //     }
  //   }
  // }, [selectedCategory]);
  if (status === "pending") {
    return <PackageCardSkeleton />;
  }

  if (status === "error") {
    return <Text variant="display-md">No packages found</Text>;
  }
  return (
    <section className="container relative">
      <div className="ite mb-6 flex flex-wrap space-x-2 lg:space-x-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              if (category.key === "none") {
                updateQueryString({});
                setSelectedCategory({ name: category.name, key: category.key });
              } else {
                updateQueryString({ "filters[season]": category.name });
                setSelectedCategory({ name: category.name, key: category.key });
              }
            }}
            className={`mx-4 flex cursor-pointer flex-col items-center space-x-2 border-b-2 py-2 text-sm font-extrabold md:text-base ${
              selectedCategory.name === category.name
                ? "border-b-2 border-primary text-primary"
                : "border-transparent text-gray-600"
            }`}
          >
            {category.icon}
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {data.data?.length > 0 ? (
          data?.data?.map((pkg, index) => <PackageCard key={index} pkg={pkg} />)
        ) : (
          <span>No packages are available</span>
        )}
      </div>
    </section>
  );
}
