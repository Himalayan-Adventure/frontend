"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import PackageCard from "./package-card";
import { packages } from "@/data/packagesData";
import { FaIcons } from "react-icons/fa"; // Import any icon from react-icons
import { getPackages } from "@/server/packages/get-packages";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { APIResponseCollection } from "@/types/types";

export default function PackagesList() {
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::packages.packages">
  >({
    queryKey: ["packages"],
    queryFn: async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?populate=*`,
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPackages =
    selectedCategory === "All"
      ? data?.data
      : data?.data
          //@ts-ignore
          ?.filter((pkg) => pkg.attributes?.type === selectedCategory);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  const categories = [
    { name: "All", icon: <FaIcons size={12} /> },
    { name: "Elite", icon: <FaIcons size={12} /> },
    { name: "Premium", icon: <FaIcons size={12} /> },
    { name: "Basic", icon: <FaIcons size={12} /> },
  ];

  return (
    <section className="container relative">
      <div className="ite mb-6 flex flex-wrap space-x-2 lg:space-x-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category.name)}
            className={`mx-4 flex cursor-pointer flex-col items-center space-x-2 border-b-2 py-2 text-sm font-extrabold md:text-base ${
              selectedCategory === category.name
                ? "border-b-2 border-primary text-primary"
                : "border-transparent text-gray-600"
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {filteredPackages && filteredPackages?.length > 0 ? (
          filteredPackages?.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} />
          ))
        ) : (
          <span>No packages are available</span>
        )}
      </div>
    </section>
  );
}
