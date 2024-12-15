"use client";
import { useState } from "react";
import { FaDollarSign, FaRegQuestionCircle } from "react-icons/fa";
import { RiSlideshowFill } from "react-icons/ri";
import { usePlanContext } from "@/components/plan-page/plan-context";
import { toast } from "sonner";

interface Budget {
  id: number;
  fixed_budget: string | null;
  budget_range_start: string | null;
  budget_range_end: string | null;
  decide_later: boolean;
}

const options = [
  {
    icon: <FaDollarSign />,
    name: "Fixed Budget",
  },
  {
    icon: <RiSlideshowFill />,
    name: "Set your Budget Range",
  },
  {
    icon: <FaRegQuestionCircle />,
    name: "I'll decide later",
  },
];

export default function BudgetSelection() {
  const {
    selectedBudgetOption,
    setSelectedBudgetOption,
    fixedAmount,
    setFixedAmount,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    setBudget,
  } = usePlanContext();

  const [tripPlanned, setTripPlanned] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedBudgetOption(option);
    setTripPlanned(false);

    if (option === "Fixed Budget") {
      setFixedAmount(null);
      setMinBudget(null);
      setMaxBudget(null);
    } else if (option === "Set your Budget Range") {
      setFixedAmount(null);
    } else if (option === "I'll decide later") {
      setFixedAmount(null);
      setMinBudget(null);
      setMaxBudget(null);
    }
  };

  const handlePlanTrip = () => {
    if (selectedBudgetOption === "Fixed Budget") {
      if (fixedAmount === null || fixedAmount <= 0) {
        toast.message("Please enter a valid fixed amount.");
        return;
      }
      const budget: Budget = {
        id: 1, // Assuming a valid id for demonstration
        fixed_budget: fixedAmount.toString(),
        budget_range_start: null,
        budget_range_end: null,
        decide_later: false,
      };
      setBudget(budget);
      setTripPlanned(true);
    } else if (selectedBudgetOption === "Set your Budget Range") {
      if (minBudget === null || maxBudget === null || minBudget >= maxBudget) {
        toast.message("Please set a valid budget range.");
        return;
      }
      const budget: Budget = {
        id: 1, // Assuming a valid id for demonstration
        fixed_budget: null,
        budget_range_start: minBudget.toString(),
        budget_range_end: maxBudget.toString(),
        decide_later: false,
      };
      setBudget(budget);
      setTripPlanned(true);
    } else if (selectedBudgetOption === "I'll decide later") {
      const budget: Budget = {
        id: 1, // Assuming a valid id for demonstration
        fixed_budget: null,
        budget_range_start: null,
        budget_range_end: null,
        decide_later: true,
      };
      setBudget(budget);
      setTripPlanned(true);
    }
  };

  return (
    <div className="p-4">
     
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
              selectedBudgetOption === option.name
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <span
              className={`text-2xl lg:text-4xl ${
                selectedBudgetOption === option.name
                  ? "text-white"
                  : "text-primary"
              }`}
            >
              {option.icon}
            </span>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">{option.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        {selectedBudgetOption === "Fixed Budget" && (
          <div className="w-full px-4">
            <input
              type="number"
              placeholder="Enter your fixed budget"
              className="w-full rounded-md border border-gray-300 p-2"
              value={fixedAmount ?? ""}
              onChange={(e) => setFixedAmount(Number(e.target.value))}
            />
          </div>
        )}

        {selectedBudgetOption === "Set your Budget Range" && (
          <div className="mt-6 flex flex-row items-center justify-center gap-4">
            <div className="w-full">
              <input
                type="range"
                min="500"
                max="15000"
                className="custom-slider w-full"
                value={minBudget ?? ""}
                onChange={(e) => setMinBudget(Number(e.target.value))}
              />
            </div>
            <div className="w-full">
              <input
                type="range"
                min="500"
                max="15000"
                className="custom-slider -ml-12 w-full"
                value={maxBudget ?? ""}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <span className="font-medium text-gray-700">${minBudget}/person</span>
        <span className="font-medium text-gray-700">${maxBudget}/person</span>
      </div>

      <div className="mt-6 text-center">
        <button
          className="rounded-lg bg-primary px-6 py-2 text-white"
          onClick={handlePlanTrip}
        >
          Plan My Trip
        </button>
        {tripPlanned && (
          <p className="mt-4 text-center text-sm font-semibold text-green-600">
            Trip planned successfully!
          </p>
        )}
      </div>
    </div>
  );
}
