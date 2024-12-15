// Travel.tsx
import { FaUser, FaQuestion } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { usePlanContext } from "./plan-context";

export const travelOptions = [
  {
    icon: <FaUser />,
    name: "Solo",
    value: "solo",
  },
  {
    icon: <MdGroups2 />,
    name: "Group",
    value: "group",
  },
  {
    icon: <FaQuestion />,
    name: "Not Sure?",
    value: "not sure",
  },
];

export default function Travel() {
  const { group, setGroup } = usePlanContext();

  const handleOptionClick = (optionValue: string) => {
    setGroup(optionValue);
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
        {travelOptions.map((option) => (
          <div
            key={option.value}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out lg:p-4 ${
              group === option.value
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                group === option.value ? "text-white" : "text-primary"
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
