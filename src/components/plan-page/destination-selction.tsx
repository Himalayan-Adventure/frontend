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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-countries?populate=*`,
        );
        setCountries(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleOptionClick = (countryId: number) => {
    setSelectedId(countryId);
    setSelectedDestinationId(countryId);
  };

  const selectedCountryData = countries?.find(
    (country) => country?.id === selectedId,
  );

  return (
    <div className="p-2 lg:p-4">
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            {countries?.map((country) => (
              <div
                key={country?.id}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
                  selectedId === country?.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleOptionClick(country?.id)}
              >
                <div>
                  <img
                    src={country?.attributes?.flag_icon?.data?.attributes?.url}
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
            {selectedCountryData && (
              <div className="mt-8 text-center">
                <img
                  src={
                    selectedCountryData?.attributes?.flag_map?.data?.attributes
                      ?.url
                  }
                  alt={`${selectedCountryData?.attributes?.name} map`}
                  className="mx-auto h-64 w-64 object-contain"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
