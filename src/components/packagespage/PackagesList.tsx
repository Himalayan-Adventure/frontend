/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import PackageCard from "./PackageCard";
import { packages } from "@/data/packagesData";
import { FaIcons } from "react-icons/fa"; // Import any icon from react-icons

export default function PackagesList() {
  const categories = [
    { name: "All", icon: <FaIcons /> },
    { name: "Adventure", icon: <FaIcons /> },
    { name: "Cultural", icon: <FaIcons /> },
    { name: "Luxury", icon: <FaIcons /> },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPackages =
    selectedCategory === "All"
      ? packages
      : packages.filter((pkg) => pkg?.category === selectedCategory);

  return (
    <section className="container relative">
      <div className="ite mb-6 flex space-x-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category.name)}
            className={`mx-4 flex flex-col items-center space-x-2 border-b-2 py-2 font-extrabold ${
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
        {filteredPackages.map((pkg, index) => (
          <PackageCard key={index} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
