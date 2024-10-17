// Existing import statements
import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaRedo } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import MakeAdjustments from "./make-adjustments";
import YourDetailsForm from "./personal-details-form";
import Details from "./details";

const options = [
  {
    icon: <FaRedo />,
    name: "Make Adjustments",
    content: <MakeAdjustments />,
  },
  {
    icon: <BsPatchCheckFill />,
    name: "Check Your Itinerary",
    content: null,
  },
  {
    icon: <TbListDetails />,
    name: "Your Details",
    content: <YourDetailsForm />,
  },
];

export default function ReviewFinal() {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Check Your Itinerary",
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const selectedContent = options.find(
    (option) => option.name === selectedOption,
  )?.content;

  // Update the content for "Check Your Itinerary" to include the setSelectedOption prop
  options[1].content = <Details setSelectedOption={setSelectedOption} />;

  return (
    <div className="">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Review and Finalize
      </h2>
      <div className="grid gap-4 lg:grid-cols-6 lg:gap-8">
        {/* Tabs */}
        <div className="flex flex-col pr-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {options.map((option) => (
              <div
                key={option.name}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
                  selectedOption === option.name
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleOptionClick(option.name)}
              >
                <span
                  className={`text-xl lg:text-4xl ${
                    selectedOption === option.name
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
        </div>

        {/* Content */}
        <div className="flex items-center justify-center lg:col-span-4">
          {selectedContent && (
            <div className="w-full">
              {typeof selectedContent === "string" ? (
                <p>{selectedContent}</p>
              ) : (
                selectedContent
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
