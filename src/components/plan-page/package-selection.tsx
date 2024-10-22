import { useState } from "react";
import { GiHiking, GiStairsGoal } from "react-icons/gi";
import { MdHiking } from "react-icons/md";
import { usePlanContext } from "./plan-context";

const levels = [
  {
    name: "Beginner",
    icon: <GiStairsGoal />,
    value: "beginner",
  },
  {
    name: "Intermediate",
    icon: <MdHiking />,
    value: "intermediate",
  },
  {
    name: "Advanced",
    icon: <GiHiking />,
    value: "advanced",
  },
];

export default function GradeSelection() {
  const [selectedLevel, setSelectedLevel] = useState<string>("beginner");
  const { setGrade } = usePlanContext();

  const handleLevelClick = (levelValue: string) => {
    setSelectedLevel(levelValue);
    setGrade(levelValue);
  };

  return (
    <div className="p-4 lg:p-8">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Choose your Grade
      </h2>
      <div className="flex flex-wrap gap-4 lg:justify-center lg:space-x-6">
        {levels.map((level) => (
          <div
            key={level.value}
            className="group flex cursor-pointer items-center space-x-2 text-primary"
            onClick={() => handleLevelClick(level.value)}
          >
            <div
              className={`w-auto rounded-full border border-primary p-2 shadow-lg shadow-gray-400 transition duration-300 ease-in-out ${
                selectedLevel === level.value
                  ? "bg-primary text-white"
                  : "group-hover:bg-gray-100"
              }`}
            >
              {level.icon}
            </div>
            <div
              className={`rounded-lg px-4 py-2 shadow-lg shadow-gray-400 transition-colors duration-300 ease-in-out ${
                selectedLevel === level.value
                  ? "bg-primary text-white"
                  : "group-hover:bg-gray-100"
              }`}
            >
              {level.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
