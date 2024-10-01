/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaFlag } from "react-icons/fa";
import { usePlanContext } from "./plan-context";

const options = [
  {
    flagImage: "/images/nepalflag.png",
    mapImage: "/images/nepalmap.png",
    name: "Nepal",
  },
  {
    flagImage: "/images/chinaflag.png",
    mapImage: "/images/chinaMap.png",
    name: "China",
  },
  {
    flagImage: "/images/indiaflag.png",
    mapImage: "/images/indiamap.png",
    name: "India",
  },
  {
    flagImage: "/images/pakistanflag.png",
    mapImage: "/images/pakistanmap.png",
    name: "Pakistan",
  },
];

export default function DestinationSelection() {
  const { updatePlanData } = usePlanContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    updatePlanData("destination", option);
  };

  const selectedOptionData = options.find(
    (option) => option.name === selectedOption,
  );

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Select your Destination
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 md:p-4 shadow-lg transition-colors duration-300 ease-in-out ${
              selectedOption === option.name
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <div>
              <img src={option?.flagImage} alt="" className="w-6 md:w-12" />
            </div>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">{option.name}</span>
          </div>
        ))}
      </div>

      <div>
        {/* Show map image based on selected country */}
        {selectedOptionData && (
          <div className="mt-8 text-center">
            <img
              src={selectedOptionData.mapImage}
              alt={`${selectedOptionData.name} map`}
              className="mx-auto w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
