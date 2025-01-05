/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaLeaf,
  FaSnowflake,
  FaStopwatch,
  FaSun,
  FaTree,
} from "react-icons/fa";
import { FaMountain } from "react-icons/fa6";
import { MdUpgrade } from "react-icons/md";
import DynamicReactIcon from "../icons/strapi-icon";
import { usePlanContext } from "./plan-context";

export default function PackageSelection() {
  const [types, setTypes] = useState<any>([]);
  const [packages, setPackages] = useState<any>([]);
  const [visiblePackages, setVisiblePackages] = useState<any>([]); // Packages to show
  const [selectedType, setSelectedType] = useState("");
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [showMore, setShowMore] = useState(false); // Whether to show more packages
  const { selectedPackageIds, setSelectedPackageIds, setSelectedPackageType } =
    usePlanContext();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoadingTypes(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-types?populate=*`,
        );
        setTypes(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      if (selectedType) {
        try {
          setLoadingPackages(true);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?filters[package_types][name][$eq]=${selectedType}&fields[0]=package_name&populate[image][populate]0]=image&fields[2]=parent_title&populate[adventure_specification][populate][1]=season&populate[package_host][populate][3]=package_host&populate[adventure_specification][populate][2]=grade`,
          );
          const fetchedPackages = response?.data?.data || [];
          setPackages(fetchedPackages);

          // Show only first three initially
          setVisiblePackages(fetchedPackages.slice(0, 3));
          setShowMore(fetchedPackages.length > 3); // Show "See More" if more than 3 packages
        } catch (error) {
          console.error("Error fetching packages:", error);
        } finally {
          setLoadingPackages(false);
        }
      }
    };

    fetchPackages();
  }, [selectedType]);

  const handleOptionClick = (type: string) => {
    setSelectedType(type);
    setSelectedPackageType([type]);
  };

  const handleSelectPackage = (pkg: any) => {
    if (selectedPackageIds.includes(pkg?.id)) {
      setSelectedPackageIds((prev) => prev.filter((name) => name !== pkg?.id));
    } else {
      setSelectedPackageIds((prev) => [...prev, pkg?.id]);
    }
  };

  const handleShowMore = () => {
    setVisiblePackages(packages);
    setShowMore(false); // Hide "See More" after all packages are displayed
  };

  return (
    <div className="p-4 lg:p-8">
      {loadingTypes ? (
        <div className="flex items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      ) : (
        <div className="relative">
          {/* Scroll Indicator on the left */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-gray-50 to-transparent"></div>

          {/* Scrollable container */}
          <div className="scrollbar-hide flex gap-4 overflow-auto pl-12 lg:gap-8">
            {types.map((type: any, index: number) => (
              <div
                key={type?.attributes?.name}
                className={`flex min-w-[10rem] cursor-pointer flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out md:p-4 ${
                  selectedType === type?.attributes?.name
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } ${index === 0 ? "-ml-12" : ""}`}
                onClick={() => handleOptionClick(type?.attributes?.name)}
              >
                <span
                  className={`text-xl lg:text-4xl ${
                    selectedType === type?.attributes?.name
                      ? "text-white"
                      : "text-primary"
                  }`}
                >
                  <DynamicReactIcon
                    name={type?.attributes?.react_icon || "FaMountainSun"}
                  />
                </span>
                <hr className="my-2 w-full border-gray-300" />
                <span className="text-sm md:text-base">
                  {type?.attributes?.name}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll Indicator on the right */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>
      )}

      <div className="my-4 lg:mt-8">
        <h2 className="pb-2 text-left text-xl font-medium md:text-3xl">
          {selectedType ? `${selectedType}` : ""}
        </h2>
        <hr />
      </div>

      <div className="space-y-4">
        {loadingPackages ? (
          <div className="flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : visiblePackages.length > 0 ? (
          visiblePackages.map((pkg: any) => (
            <div
              key={pkg?.id}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div className="max-h-48 overflow-hidden sm:w-1/4">
                <img
                  src={
                    pkg?.attributes?.image?.data?.[0]?.attributes?.url ||
                    "/placeholder.jpg"
                  }
                  alt={pkg?.attributes?.package_name}
                  className="h-48 w-full rounded object-cover"
                />
              </div>
              <div className="border-black sm:w-2/4 sm:border-r">
                <h3 className="text-left text-lg font-semibold">
                  {pkg?.attributes?.package_name}
                </h3>
                <ul className="mt-2 space-y-1 text-left text-sm">
                  <li className="flex items-center gap-2">
                    {pkg?.attributes?.adventure_specification?.season?.[0]
                      ?.name && (
                      <>
                        {(() => {
                          const season =
                            pkg?.attributes?.adventure_specification?.season?.[0]?.name.toLowerCase();
                          switch (season) {
                            case "summer":
                              return <FaSun />;
                            case "winter":
                              return <FaSnowflake />;
                            case "spring":
                              return <FaLeaf />;
                            case "autumn":
                              return <FaTree />;
                            default:
                              return null;
                          }
                        })()}
                        <span className="font-medium capitalize">
                          {
                            pkg?.attributes?.adventure_specification
                              ?.season?.[0]?.name
                          }
                        </span>
                      </>
                    )}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaStopwatch />
                    <span className="font-medium">Duration:</span>{" "}
                    {pkg?.attributes?.adventure_specification?.duration} days
                  </li>
                  <li className="flex items-center gap-2">
                    <MdUpgrade />
                    <span className="font-medium">Grade:</span>{" "}
                    {pkg?.attributes?.adventure_specification?.grade?.[0]?.name}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMountain />
                    <span className="font-medium">Max Altitude:</span>{" "}
                    {pkg?.attributes?.adventure_specification?.max_altitude}
                  </li>
                </ul>
              </div>
              <div className="h-full">
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className={`rounded-full px-4 py-2 text-white ${
                    selectedPackageIds.includes(pkg?.id)
                      ? "bg-primary"
                      : "bg-black"
                  }`}
                >
                  {selectedPackageIds.includes(pkg?.id) ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-left">No packages available for this type</p>
        )}

        {showMore && (
          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="mt-4 rounded-full bg-primary px-6 py-2 text-white"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
