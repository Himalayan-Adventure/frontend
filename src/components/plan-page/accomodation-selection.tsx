/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { usePlanContext } from "@/components/plan-page/plan-context";
import axios from "axios";
import { useEffect, useState } from "react";
import DynamicReactIcon from "../icons/strapi-icon";

export default function AccomodationSelection() {
  const { setAccommodation } = usePlanContext();
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchAccPreferences = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/accommodation-preferences?populate=*`,
        );
        setOptions(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };

    fetchAccPreferences();
  }, []);

  const handleOptionClick = (optionId: number, optionName: string) => {
    setSelectedOption((prev) => (prev === optionId ? null : optionId));
    setAccommodation([optionName]);
  };

  const selectedPreferences =
    options.find((option) => option.id === selectedOption)?.attributes
      ?.preference || [];

  return (
    <div className="p-2 lg:p-4">
      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Accommodation Options */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            {options?.map((option) => (
              <div
                key={option?.id}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-colors duration-300 ease-in-out ${
                  selectedOption === option.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() =>
                  handleOptionClick(option?.id, option?.attributes?.name)
                }
              >
                <span
                  className={`text-xl lg:text-4xl ${
                    selectedOption === option.id ? "text-white" : "text-primary"
                  }`}
                >
                  <DynamicReactIcon name={option?.attributes?.react_icon} />
                </span>
                <hr className="my-2 w-full border-gray-300" />
                <span className="text-sm md:text-base">
                  {option?.attributes?.name}
                </span>
              </div>
            ))}
          </div>

          {/* Selected Preferences */}
          {selectedPreferences.length > 0 && (
            <div className="mt-8">
              <h3 className="text-left text-lg font-bold text-primary">
                Preferences :
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {selectedPreferences.map((preference: any) => (
                  <li
                    key={preference.id}
                    className="rounded-lg bg-gray-100 p-2 text-sm text-gray-800 shadow-md"
                  >
                    {preference.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
