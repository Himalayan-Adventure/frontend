/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { usePlanContext } from "./plan-context";

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
  const { updatePlanData } = usePlanContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Exact date",
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    if (selectedOption === "Exact date" && date) {
      const dateString = date.toISOString().split("T")[0];
      updatePlanData("travelDates", dateString);
    } else if (selectedOption === "Flexible Date Range" && dateRange) {
      const startDateString = dateRange.from?.toISOString().split("T")[0];
      const endDateString = dateRange.to?.toISOString().split("T")[0];
      updatePlanData("travelDates", `${startDateString} to ${endDateString}`);
    } else if (selectedOption === "Decide Later") {
      updatePlanData("travelDates", "Decide Later");
    }
  }, [selectedOption, date, dateRange, updatePlanData]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Select your Travel Dates
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out lg:p-4 ${
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
          <div className="rounded-lg bg-white p-4 md:shadow-md">
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
          <div className="rounded-lg bg-white p-4 md:shadow-md">
            <p className="text-center">
              Choose a flexible date range for your travel:
            </p>
            <div className="flex justify-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
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
          </div>
        )}
      </div>
    </div>
  );
}
