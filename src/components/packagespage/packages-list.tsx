"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PackageCard from "./package-card";
import { packages } from "@/data/packagesData";
import { FaBorderAll, FaIcons } from "react-icons/fa"; // Import any icon from react-icons
import { Text } from "../ui/text";
import { getPackages } from "@/server/packages/get-packages";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PackagesList() {
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    key: string;
  }>({ name: "All", key: "none" });
  const router = useRouter();
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::package.package">
  >({
    queryKey: [
      "packages",
      selectedCategory,
      searchParams.get("filter"),
      searchParams.get("key"),
    ],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.set("populate", "*");
        const filter = searchParams.get("filter");
        const key = searchParams.get("key");
        if (filter && key && selectedCategory.name !== "All") {
          if (key === "altitude") {
            const filterName = `filters[${key}][startsWithi]`;
            console.log(filterName);
            params.set(filterName, filter[0]);
            console.log(filterName, filter[0]);
          } else {
            const filterName = `filters[${key}]`;
            console.log(filterName);
            params.set(filterName, filter);
            console.log(filterName, filter);
          }
        }

        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?${params.toString()}`,
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
    placeholderData: keepPreviousData,
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
    key:
      | "none"
      | "altitude"
      | "season"
      | "type"
      | "grade"
      | "difficultyLevel"
      | "planType";
    label: string;
    icon: JSX.Element;
  }> = [
    {
      name: "All",
      label: "All",
      key: "none",
      icon: <FaBorderAll className="size-6 md:size-8" />,
    },

    {
      name: "trekking",
      label: "Trekking",
      key: "planType",
      icon: <FaWalking className="size-6 md:size-8" />,
    },
    {
      name: "climbing",
      label: "Climbing",
      key: "planType",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      label: "Expeditions 8000m",
      name: "8000",
      key: "altitude",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      label: "Expeditions 7000m",
      name: "7000",
      key: "altitude",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      label: "Expeditions 6000m",
      name: "6000",
      key: "altitude",
      icon: <FaMountain className="size-6 md:size-8" />,
    },
    {
      name: "winter",
      label: "Winter",
      key: "season",
      icon: <FaSnowflake className="size-6 md:size-8" />,
    },
    {
      name: "spring",
      label: "Spring",
      key: "season",
      icon: <FaLeaf className="size-6 md:size-8" />,
    },
    {
      name: "summer",
      label: "Summer",
      key: "season",
      icon: <FaSun className="size-6 md:size-8" />,
    },
    {
      name: "autumn",
      label: "Autumn",
      key: "season",
      icon: <FaLeaf className="size-6 md:size-8" />,
    },
    {
      name: "beginner",
      label: "Beginner",
      key: "difficultyLevel",
      icon: <FaSkull className="size-6 md:size-8" />,
    },
    {
      name: "intermediate",
      label: "Intermediate",
      key: "difficultyLevel",
      icon: <FaStarHalfAlt className="size-6 md:size-8" />,
    },
    {
      name: "experienced",
      label: "Experienced",
      key: "difficultyLevel",
      icon: <FaStar className="size-6 md:size-8" />,
    },
    {
      name: "Elite",
      label: "Elite",
      key: "type",
      icon: <FaIcons className="size-6 md:size-8" />,
    },
    {
      name: "Premium",
      label: "Premium",
      key: "type",
      icon: <FaIcons className="size-6 md:size-8" />,
    },
    {
      name: "Basic",
      label: "Basic",
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
                updateQueryString({}, ["filter", "key"]);
                setSelectedCategory({ name: category.name, key: category.key });
              } else {
                updateQueryString({ key: category.key, filter: category.name });
                setSelectedCategory({ name: category.name, key: category.key });
              }
            }}
            className={`mx-4 flex cursor-pointer flex-col items-center space-x-2 border-b-2 py-2 text-sm font-extrabold md:text-base ${
              searchParams.get("filter") === category.name ||
              (category.name === "All" && searchParams.get("filter") === null)
                ? "border-b-2 border-primary text-primary"
                : "border-transparent text-gray-600"
            }`}
          >
            {category.icon}
            <span className="text-sm">{category.label}</span>
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
