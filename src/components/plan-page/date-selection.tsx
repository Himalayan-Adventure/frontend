/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";

const options = [
  {
    icon: <FaCalendarAlt />,
    name: "Exact date",
  },
  {
    icon: <MdDateRange />,
    name: "Flexible Date Range",
  },
  {
    icon: <FaQuestionCircle />,
    name: "Decide Later",
  },
];

export default function DateSelection() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined); // Correct type

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Select your Travel Dates
      </h2>
      <div className="grid gap-4 sm:grid-cols-3 lg:gap-8">
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
              {option.icon}
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
      </div>
    </div>
  );
}
