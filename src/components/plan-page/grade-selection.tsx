"use client";
import { FaHiking, FaMountain } from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { usePlanContext } from "./plan-context";

// values must match the `grade` enumeration on the plan-with-us content type
export const gradeOptions = [
  {
    icon: <FaHiking />,
    name: "Beginner",
    description: "Little or no trekking experience.",
    value: "beginner",
  },
  {
    icon: <FaMountain />,
    name: "Intermediate",
    description: "Comfortable with multi-day treks at altitude.",
    value: "intermediate",
  },
  {
    icon: <GiMountainClimbing />,
    name: "Advanced",
    description: "Experienced on technical or high-altitude routes.",
    value: "advanced",
  },
];

export default function GradeSelection() {
  const { grade, setGrade } = usePlanContext();

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
        {gradeOptions.map((option) => (
          <div
            key={option.value}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 text-center shadow-lg transition-colors duration-300 ease-in-out lg:p-4 ${
              grade === option.value
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setGrade(option.value)}
          >
            <span
              className={`text-xl lg:text-4xl ${
                grade === option.value ? "text-white" : "text-primary"
              }`}
            >
              {option.icon}
            </span>
            <hr className="my-2 w-full border-gray-300" />
            <span className="text-sm md:text-base">{option.name}</span>
            <span
              className={`mt-1 text-xs ${
                grade === option.value ? "text-white/80" : "text-gray-600"
              }`}
            >
              {option.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
