import { useState } from "react";
import { FaDollarSign, FaRegQuestionCircle } from "react-icons/fa";
import { RiSlideshowFill } from "react-icons/ri";
import { usePlanContext } from "./plan-context";

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
    setBudget, // Added this line to include setBudget
  } = usePlanContext();

  const [tripPlanned, setTripPlanned] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedBudgetOption(option);
    setTripPlanned(false);

    if (option === "Fixed Budget") {
      setFixedAmount("");
    }
  };

  const handlePlanTrip = () => {
    if (selectedBudgetOption === "Fixed Budget") {
      if (!fixedAmount || fixedAmount <= 0) {
        alert("Please enter a valid fixed amount.");
        return;
      }
      setBudget(fixedAmount);
      setTripPlanned(true);
    } else if (selectedBudgetOption === "Set your Budget Range") {
      if (!minBudget || !maxBudget || minBudget >= maxBudget) {
        alert("Please set a valid budget range.");
        return;
      }
      setBudget({ min: minBudget, max: maxBudget });
      setTripPlanned(true);
    } else if (selectedBudgetOption === "I'll decide later") {
      setBudget(null);
      setTripPlanned(true);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Budget
      </h2>
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
              value={fixedAmount}
              onChange={(e) => setFixedAmount(Number(e.target.value))}
              placeholder="Enter fixed amount"
              className="mt-4 block w-full rounded-md border border-gray-300 p-3 outline-none"
            />
            <button
              onClick={handlePlanTrip}
              className="mt-4 w-full rounded-md bg-primary px-6 py-3 font-medium text-white transition duration-300 hover:bg-opacity-90"
            >
              Plan the Trip
            </button>
          </div>
        )}

        {selectedBudgetOption === "Set your Budget Range" && (
          <div>
            <div className="mt-6 flex flex-row items-center justify-center gap-4">
              <div className="w-full">
                <input
                  type="range"
                  min="500"
                  max="15000"
                  value={minBudget}
                  onChange={(e) => setMinBudget(Number(e.target.value))}
                  className="custom-slider w-full"
                />
              </div>

              <div className="w-full">
                <input
                  type="range"
                  min="500"
                  max="15000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="custom-slider -ml-12 w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="font-medium text-gray-700">
                ${minBudget}/person
              </span>
              <span className="font-medium text-gray-700">
                ${maxBudget}/person
              </span>
            </div>

            <button
              onClick={handlePlanTrip}
              className="mt-6 w-full rounded-lg bg-primary py-3 font-medium text-white transition-transform duration-300 hover:bg-opacity-90 active:scale-95"
            >
              Plan Trip
            </button>
          </div>
        )}

        {selectedBudgetOption === "I'll decide later" && (
          <div className="mt-4 font-medium text-gray-700">
            Feel free to explore more options!
          </div>
        )}

        {tripPlanned && (
          <div className="mt-8 text-center">
            {selectedBudgetOption === "Fixed Budget" ? (
              <p className="text-xl font-semibold">
                You have fixed a budget of ${fixedAmount}.
              </p>
            ) : selectedBudgetOption === "Set your Budget Range" ? (
              <p className="text-xl font-semibold">
                You have set a budget range from ${minBudget} to ${maxBudget}.
              </p>
            ) : (
              <p className="text-xl font-semibold">
                You can decide your budget later.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
