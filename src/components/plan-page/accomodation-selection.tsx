/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaBook, FaRegMinusSquare } from "react-icons/fa";
import { GiCampCookingPot } from "react-icons/gi";
import { RiVipFill } from "react-icons/ri";
import { usePlanContext } from "./plan-context"; // Importing context

const options = [
  {
    icon: <FaRegMinusSquare />,
    name: "Basic",
  },
  {
    icon: <RiVipFill />,
    name: "Luxury",
  },
  {
    icon: <GiCampCookingPot />,
    name: "Camping",
  },
  {
    icon: <FaBook />,
    name: "Self-Book",
  },
];

export default function AccomodationSelection() {
  const { accommodation, setAccommodation } = usePlanContext(); // Destructuring accommodation and setter from context

  // Initialize selected options from context or set to an empty array if none
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    accommodation || [],
  );

  const handleOptionClick = (option: string) => {
    const lowercaseOption = option.toLowerCase(); // Convert option name to lowercase
    let updatedOptions: string[];
    if (selectedOptions.includes(lowercaseOption)) {
      // If already selected, remove the option
      updatedOptions = selectedOptions.filter((opt) => opt !== lowercaseOption);
    } else {
      // If not selected, add it to the array
      updatedOptions = [...selectedOptions, lowercaseOption];
    }

    setSelectedOptions(updatedOptions); // Update local state
    setAccommodation(updatedOptions); // Update context state with the new selections
  };

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Accommodation Preferences
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-colors duration-300 ease-in-out ${
              selectedOptions.includes(option.name.toLowerCase())
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                selectedOptions.includes(option.name.toLowerCase())
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
  );
}
