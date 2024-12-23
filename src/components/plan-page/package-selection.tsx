/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import DynamicReactIcon from "../icons/strapi-icon";
import { usePlanContext } from "./plan-context";
import {
  FaCloudRain,
  FaLeaf,
  FaSnowflake,
  FaStopwatch,
  FaSun,
  FaTimesCircle,
  FaTree,
} from "react-icons/fa";
import { MdUpgrade } from "react-icons/md";
import { FaMountain } from "react-icons/fa6";

export default function PackageSelection() {
  const [types, setTypes] = useState<any>([]);
  const [packages, setPackages] = useState<any>([]);
  const [selectedType, setSelectedType] = useState("");
  const { selectedPackageIds, setSelectedPackageIds } = usePlanContext();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-types?populate=*`,
        );
        setTypes(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      if (selectedType) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?filters[package_types][name][$eq]=${selectedType}&fields[0]=package_name&populate[image][populate]0]=image&fields[2]=parent_title&populate[adventure_specification][populate][1]=season&populate[package_host][populate][3]=package_host&populate[adventure_specification][populate][2]=grade`,
          );
          setPackages(response?.data?.data || []);
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      }
    };

    fetchPackages();
  }, [selectedType]);

  const handleOptionClick = (type: string) => {
    setSelectedType(type);
  };

  const handleSelectPackage = (pkg: any) => {
    if (selectedPackageIds.includes(pkg?.id)) {
      setSelectedPackageIds((prev) => prev.filter((name) => name !== pkg?.id));
    } else {
      setSelectedPackageIds((prev) => [...prev, pkg?.id]);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {types.map((type: any) => (
          <div
            key={type?.attributes?.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
              selectedType === type?.attributes?.name
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(type?.attributes?.name)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                selectedType === type?.attributes?.name
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <DynamicReactIcon name={type?.attributes?.icon} />
            </span>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">
              {type?.attributes?.name}
            </span>
          </div>
        ))}
      </div>

      {/* packages list according to selected type */}
      <div className="my-4">
        <h2 className="pb-2 text-left text-xl font-medium md:text-3xl">
          {selectedType ? `${selectedType}` : ""}
        </h2>
        <hr />
      </div>
      <div className="space-y-4">
        {packages.length > 0 ? (
          packages.map((pkg: any) => (
            <div
              key={pkg?.id}
              className="flex flex-col sm:items-center gap-4 sm:flex-row"
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
      </div>
    </div>
  );
}
