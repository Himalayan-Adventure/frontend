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
  const { updatePlanData } = usePlanContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fixedAmount, setFixedAmount] = useState<number | "">("");
  const [minBudget, setMinBudget] = useState<number>(1000);
  const [maxBudget, setMaxBudget] = useState<number>(150000);
  const [tripPlanned, setTripPlanned] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setTripPlanned(false);
    if (option === "Fixed Budget") {
      updatePlanData("budget", fixedAmount.toString());
    } else if (option === "Set your Budget Range") {
      updatePlanData("budget", `$ ${minBudget} to $ ${maxBudget}`);
    } else if (option === "I'll decide later") {
      updatePlanData("budget", "I'll decide later");
    }

    if (option !== "Fixed Budget") {
      setFixedAmount("");
    }
  };

  const handlePlanTrip = () => {
    console.log(
      "Planning trip with:",
      selectedOption,
      fixedAmount,
      minBudget,
      maxBudget,
    );

    if (selectedOption === "Fixed Budget") {
      updatePlanData("budget", fixedAmount.toString());
    } else if (selectedOption === "Set your Budget Range") {
      updatePlanData("budget", `${minBudget} to ${maxBudget}`);
    } else if (selectedOption === "I'll decide later") {
      updatePlanData("budget", "I'll decide later");
    }

    setTripPlanned(true);
  };

  const primaryColor = "#FD9100";

  return (
    <div className="p-4">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Budget Selection
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-3 shadow-xl transition-transform duration-300 hover:scale-105 md:p-5 ${
              selectedOption === option.name
                ? "bg-primary text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <span
              className={`text-4xl ${
                selectedOption === option.name ? "text-white" : "text-primary"
              }`}
            >
              {option.icon}
            </span>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm font-medium md:text-lg">
              {option.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        {selectedOption === "Fixed Budget" && (
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

        {selectedOption === "Set your Budget Range" && (
          <div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="w-full">
                <input
                  type="range"
                  min="1000"
                  max="150000"
                  value={minBudget}
                  onChange={(e) => setMinBudget(Number(e.target.value))}
                  className="custom-slider w-full"
                />
              </div>

              <div className="w-full">
                <input
                  type="range"
                  min="1000"
                  max="150000"
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

        {selectedOption === "I'll decide later" && (
          <div className="mt-4 font-medium text-gray-700">
            Feel free to explore more options!
          </div>
        )}
      </div>

      {tripPlanned && (
        <div className="mt-8 text-center">
          {selectedOption === "Fixed Budget" ? (
            <p className="text-xl font-semibold">
              You have fixed a budget of ${fixedAmount}.
            </p>
          ) : selectedOption === "Set your Budget Range" ? (
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
  );
}
