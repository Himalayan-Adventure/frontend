import { useState } from "react";
import { FaHelicopter, FaQuestion, FaUser } from "react-icons/fa";
import { MdGroups2, MdOutlineFestival, MdParagliding } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { usePlanContext } from "./plan-context";

const options = [
  {
    icon: <IoIosPersonAdd />,
    name: "Add-ons",
  },
  {
    icon: <MdParagliding />,
    name: "Adventure Activities",
  },
  {
    icon: <MdOutlineFestival />,
    name: "Cultural Experiences",
  },
  {
    icon: <FaHelicopter />,
    name: "Transportation options",
  },
];

export default function CustomizeExperience() {
  const { updatePlanData } = usePlanContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    console.log("Option clicked:", option);
    setSelectedOption(option);
    updatePlanData("experience", option);
  };

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Customize Your Experience
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
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
    </div>
  );
}
