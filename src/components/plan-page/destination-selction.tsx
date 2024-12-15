"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { usePlanContext } from "@/components/plan-page/plan-context";
import axios from "axios";

export default function DestinationSelection() {
  const { destination, setDestination } = usePlanContext();
  const [countries, setCountries] = useState<any[]>();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    destination || null,
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-countries?populate=*`,
        );
        setCountries(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleOptionClick = (country: string) => {
    setSelectedOption(country);
    setDestination(country);
  };

  const selectedOptionData = countries?.find(
    (country) => country?.attributes?.name === selectedOption,
  );

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {countries?.map((country) => (
          <div
            key={country?.attributes?.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
              selectedOption === country?.attributes?.name
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(country?.attributes?.name)}
          >
            <div>
              <img
                src={country?.attributes?.flag?.data?.attributes?.url}
                alt=""
                className="w-6 md:w-12"
              />
            </div>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">
              {country?.attributes?.name}
            </span>
          </div>
        ))}
      </div>

      <div>
        {/* Show map image based on selected country */}
        {selectedOptionData && (
          <div className="mt-8 text-center">
            <img
              src={selectedOptionData?.attributes?.map?.data?.attributes?.url}
              alt={`${selectedOptionData?.attributes?.name} map`}
              className="mx-auto h-64 w-64 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
