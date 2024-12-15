"use client";
import { useEffect } from "react";
import { usePlanContext } from "@/components/plan-page/plan-context";
import { FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Calendar } from "../ui/calendar";

export default function DateSelection() {
  const options = [
    {
      icon: <FaCalendarAlt className="text-xl lg:text-4xl" />,
      name: "Exact date",
    },
    {
      icon: <MdDateRange className="text-xl lg:text-4xl" />,
      name: "Flexible Date Range",
    },
    {
      icon: <FaQuestionCircle className="text-xl lg:text-4xl" />,
      name: "Decide Later",
    },
  ];

  const {
    setTravelDates,
    selectedOption,
    setSelectedOption,
    date,
    setDate,
    dateRange,
    setDateRange,
    travelDates,
  } = usePlanContext();

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption === "Exact date" && date) {
        const formattedDate = date.toISOString().split("T")[0];
        setTravelDates({
          ...(travelDates || {}),
          exact_date_start: formattedDate,
          exact_date_end: formattedDate,
          flexible_date_start: null,
          flexible_date_end: null,
          decide_later: false,
        });
      } else if (
        selectedOption === "Flexible Date Range" &&
        dateRange?.from &&
        dateRange?.to
      ) {
        const startDateString = dateRange.from.toISOString().split("T")[0];
        const endDateString = dateRange.to.toISOString().split("T")[0];
        setTravelDates({
          ...(travelDates || {}),
          exact_date_start: null,
          exact_date_end: null,
          flexible_date_start: startDateString,
          flexible_date_end: endDateString,
          decide_later: false,
        });
      } else if (selectedOption === "Decide Later") {
        setTravelDates({
          ...(travelDates || {}),
          exact_date_start: null,
          exact_date_end: null,
          flexible_date_start: null,
          flexible_date_end: null,
          decide_later: true,
        });
      }
    }
  }, [selectedOption, date, dateRange, setTravelDates, travelDates]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-2 lg:p-4">
      
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
          <div className="rounded-lg bg-white p-4 md:shadow-md">
            <p className="text-center">
              You can decide your travel dates later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
