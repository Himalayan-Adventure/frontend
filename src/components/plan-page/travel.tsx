import { FaQuestion, FaUser } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { usePlanContext } from "./plan-context";

const options = [
  {
    icon: <FaUser />,
    name: "Solo",
  },
  {
    icon: <MdGroups2 />,
    name: "Group",
  },
  {
    icon: <FaQuestion />,
    name: "Not Sure?",
  },
];

export default function Travel() {
  const { selectedTravelMode, setSelectedTravelMode } = usePlanContext();

  const handleOptionClick = (option: string) => {
    setSelectedTravelMode(option); // Update the travel mode state
  };

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        How do you want to travel?
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out lg:p-4 ${
              selectedTravelMode === option.name
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                selectedTravelMode === option.name
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
