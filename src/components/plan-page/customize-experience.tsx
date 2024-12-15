import { usePlanContext } from "@/components/plan-page/plan-context";
import { FaHelicopter } from "react-icons/fa";
import { MdGroups2, MdOutlineFestival, MdParagliding } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";

const options = [
  {
    icon: <IoIosPersonAdd />,
    name: "Add-ons",
  },
  {
    icon: <MdParagliding />,
    name: "Adventure Activitiy",
  },
  {
    icon: <MdOutlineFestival />,
    name: "Cultural Experience",
  },
  {
    icon: <FaHelicopter />,
    name: "Transportation option",
  },
];

export default function CustomizeExperience() {
  const { experience, setExperience } = usePlanContext();

  const handleOptionClick = (option: string) => {
    const lowercaseOption = option.toLowerCase(); // Convert option name to lowercase
    // Check if the option is already selected
    if (experience.includes(lowercaseOption)) {
      // Remove the option if it's already selected
      setExperience(experience.filter((exp) => exp !== lowercaseOption));
    } else {
      // Add the option to the selected experiences
      setExperience([...experience, lowercaseOption]);
    }
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {options.map((option) => (
          <div
            key={option.name}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 shadow-lg transition-colors duration-300 ease-in-out md:p-4 ${
              experience.includes(option.name.toLowerCase())
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                experience.includes(option.name.toLowerCase())
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
