"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { usePlanContext } from "@/components/plan-page/plan-context";
import axios from "axios";

export default function DestinationSelection() {
  const { selectedDestinationId, setSelectedDestinationId } = usePlanContext();
  const [countries, setCountries] = useState<any[]>();
  const [selectedId, setSelectedId] = useState<number | undefined>(
    selectedDestinationId,
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-countries?populate=*`,
        );
        setCountries(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Update the state with the selected destination ID
  const handleOptionClick = (countryId: number) => {
    setSelectedId(countryId); // Store the destination ID
    setSelectedDestinationId(countryId); // Update the context with the selected destination ID
  };

  // Find selected country data by the destination ID
  const selectedCountryData = countries?.find(
    (country) => country?.id === selectedId,
  );

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {countries?.map((country) => (
          <div
            key={country?.id} // Use the country ID here
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
              selectedId === country?.id // Compare with destination ID
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(country?.id)} // Pass the country ID here
          >
            <div>
              <img
                src={country?.attributes?.flag?.data?.attributes?.url}
                alt={country?.attributes?.name}
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
        {selectedCountryData && (
          <div className="mt-8 text-center">
            <img
              src={selectedCountryData?.attributes?.map?.data?.attributes?.url}
              alt={`${selectedCountryData?.attributes?.name} map`}
              className="mx-auto h-64 w-64 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
