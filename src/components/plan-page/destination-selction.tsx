/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaCalendarAlt, FaFlag, FaQuestionCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";

// Define your map images (you can replace these URLs with actual paths)
const options = [
  {
    flagImage: <FaFlag />,
    mapImage: "/images/chinaMap.png",
    name: "Nepal",
  },
  {
    flagImage: <FaFlag />,
    mapImage: "/images/chinaMap.png",
    name: "China",
  },
  {
    flagImage: <FaFlag />,
    mapImage: "/images/chinaMap.png",
    name: "India",
  },
  {
    flagImage: <FaFlag />,
    mapImage: "/images/chinaMap.png",
    name: "Pakistan",
  },
];

export default function DestinationSelection() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const selectedOptionData = options.find(
    (option) => option.name === selectedOption,
  );

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center  font-bold text-base md:text-xl lg:text-2xl">
        Select your Destination
      </h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:gap-8">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-colors duration-300 ease-in-out ${
              selectedOption === option.name
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                selectedOption === option.name ? "text-white" : "text-primary"
              }`}
            >
              {option.flagImage}
            </span>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">{option.name}</span>
          </div>
        ))}
      </div>

      {/* Conditional content rendering based on selected option */}
      <div className="mt-8">
        {selectedOption === "Exact date" && (
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-center">
              Choose the exact dates for your travel:
            </p>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=""
              />
            </div>
          </div>
        )}

        {selectedOption === "Flexible Date Range" && (
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-center">
              Choose a flexible date range for your travel:
            </p>
            <div className="flex justify-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                className=""
              />
            </div>
          </div>
        )}

        {selectedOption === "Decide Later" && (
          <div className="">
            <p className="text-center">
              You can decide your travel dates later.
            </p>
            <p className="mt-4 text-center text-gray-500">
              We'll remind you to select your travel dates closer to your trip.
            </p>
          </div>
        )}

        {/* Show map image based on selected country */}
        {selectedOptionData && (
          <div className="mt-8 text-center">
            <img
              src={selectedOptionData.mapImage}
              alt={`${selectedOptionData.name} map`}
              className="mx-auto w-full max-w-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
