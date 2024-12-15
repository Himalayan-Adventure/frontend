/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { usePlanContext } from "@/components/plan-page/plan-context";
import axios from "axios";
import { useEffect, useState } from "react";
import DynamicReactIcon from "../icons/strapi-icon";

export default function AccomodationSelection() {
  const { accommodation, setAccommodation } = usePlanContext();
  const [options, setOptions] = useState<any[]>();

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    accommodation || [],
  );

  useEffect(() => {
    const fetchAccPreferences = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/accommodation-preferences?populate=*`,
        );
        setOptions(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchAccPreferences();
  }, []);

  const handleOptionClick = (option: string) => {
    const lowercaseOption = option?.toLowerCase();
    let updatedOptions: string[];
    if (selectedOptions.includes(lowercaseOption)) {
      updatedOptions = selectedOptions.filter((opt) => opt !== lowercaseOption);
    } else {
      updatedOptions = [...selectedOptions, lowercaseOption];
    }

    setSelectedOptions(updatedOptions);
    setAccommodation(updatedOptions);
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {options?.map((option) => (
          <div
            key={option?.attributes?.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-colors duration-300 ease-in-out ${
              selectedOptions.includes(option?.attributes?.name.toLowerCase())
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option?.attributes?.name)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                selectedOptions.includes(option?.attributes?.name.toLowerCase())
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              <DynamicReactIcon name={option?.attributes?.icon} />
            </span>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">
              {option?.attributes?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
