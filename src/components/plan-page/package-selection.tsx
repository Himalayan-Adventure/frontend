/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  FaBolt,
  FaClock,
  FaEllipsisH,
  FaFireAlt,
  FaHiking,
  FaMountain,
  FaStar,
} from "react-icons/fa";
import { LiaBinocularsSolid } from "react-icons/lia";
import { usePlanContext } from "./plan-context";
import { GiHiking, GiStairsGoal } from "react-icons/gi";
import { MdHiking } from "react-icons/md";

interface PackageOption {
  name: string;
  details: string;
}

interface PackageOptions {
  Beginner: PackageOption[];
  Intermediate: PackageOption[];
  Advanced: PackageOption[];
}

interface Packages {
  Trekking: PackageOptions;
  Expedition: PackageOptions;
  SightSeeing: PackageOptions;
  Others: PackageOption[];
}

const options = [
  {
    icon: <FaHiking />,
    name: "Trekking",
  },
  {
    icon: <FaMountain />,
    name: "Expedition",
  },
  {
    icon: <LiaBinocularsSolid />,
    name: "SightSeeing",
  },
  {
    icon: <FaEllipsisH />,
    name: "Others",
  },
];

const levels = [
  {
    name: "Beginner",
    icon: <GiStairsGoal />,
  },
  {
    name: "Intermediate",
    icon: <MdHiking />,
  },
  {
    name: "Advanced",
    icon: <GiHiking />,
  },
];

export default function PackageSelection() {
  // const { updatePlanData } = usePlanContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Trekking",
  );
  const [selectedLevel, setSelectedLevel] = useState<string | null>("Beginner");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setSelectedLevel(null);
  };

  const handleLevelClick = (level: string) => {
    setSelectedLevel(level);
  };

  const packages: Packages = {
    Trekking: {
      Beginner: [
        { name: "Trek Package 1", details: "Details of Trek Package 1" },
        { name: "Trek Package 2", details: "Details of Trek Package 2" },
      ],
      Intermediate: [
        { name: "Trek Package 3", details: "Details of Trek Package 3" },
        { name: "Trek Package 4", details: "Details of Trek Package 4" },
      ],
      Advanced: [
        { name: "Trek Package 5", details: "Details of Trek Package 5" },
        { name: "Trek Package 6", details: "Details of Trek Package 6" },
      ],
    },
    Expedition: {
      Beginner: [
        {
          name: "Expedition Package 1",
          details: "Details of Expedition Package 1",
        },
        {
          name: "Expedition Package 2",
          details: "Details of Expedition Package 2",
        },
      ],
      Intermediate: [
        {
          name: "Expedition Package 3",
          details: "Details of Expedition Package 3",
        },
        {
          name: "Expedition Package 4",
          details: "Details of Expedition Package 4",
        },
      ],
      Advanced: [
        {
          name: "Expedition Package 5",
          details: "Details of Expedition Package 5",
        },
        {
          name: "Expedition Package 6",
          details: "Details of Expedition Package 6",
        },
      ],
    },
    SightSeeing: {
      Beginner: [
        {
          name: "Sightseeing Package 1",
          details: "Details of Sightseeing Package 1",
        },
        {
          name: "Sightseeing Package 2",
          details: "Details of Sightseeing Package 2",
        },
      ],
      Intermediate: [
        {
          name: "Sightseeing Package 3",
          details: "Details of Sightseeing Package 3",
        },
        {
          name: "Sightseeing Package 4",
          details: "Details of Sightseeing Package 4",
        },
      ],
      Advanced: [
        {
          name: "Sightseeing Package 5",
          details: "Details of Sightseeing Package 5",
        },
        {
          name: "Sightseeing Package 6",
          details: "Details of Sightseeing Package 6",
        },
      ],
    },
    Others: [
      { name: "Package 1", details: "Details of Package 1" },
      { name: "Package 2", details: "Details of Package 2" },
      { name: "Package 3", details: "Details of Package 3" },
      { name: "Package 4", details: "Details of Package 4" },
      { name: "Package 5", details: "Details of Package 5" },
      { name: "Package 6", details: "Details of Package 6" },
    ],
  };

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const renderPackages = () => {
    if (!selectedOption) return null;

    const isOthers = selectedOption === "Others";
    const selectedPackages = isOthers
      ? packages.Others
      : (packages[selectedOption as keyof Packages] as PackageOptions)[
          selectedLevel as keyof PackageOptions
        ];

    if (!selectedPackages) return null;

    return (
      <div className="mt-4">
        <h3 className="flex border-b border-gray-700 pb-2 text-lg font-semibold lg:text-2xl">
          {isOthers ? `${selectedOption}` : `${selectedOption} `}
        </h3>
        <div className="mt-2 grid grid-cols-1 gap-4">
          {selectedPackages.map((pkg, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4 border-b border-gray-700 py-4 md:flex-row md:items-center"
            >
              {/* Package Image */}
              <img
                src="https://a.storyblok.com/f/142343/1920x2400/80fa2a942f/hiking-on-mountain.jpg/m/769x586/smart"
                alt="Package Image"
                className="h-32 w-auto rounded-md object-cover object-top md:h-40"
              />

              {/* Package Details */}
              <div className="flex-1">
                <div className="mt-2 space-y-2">
                  <h3 className="flex text-xl font-semibold">{pkg.name}</h3>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span className="text-sm md:text-base">
                      Duration: 55 days
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span className="text-sm md:text-base">
                      Duration: 55 days
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBolt />
                    <span className="text-sm md:text-base">
                      Grade: Challenging
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMountain />
                    <span className="text-sm md:text-base">
                      Max Altitude: 8,586m/28,169ft
                    </span>
                  </div>
                </div>
              </div>

              {/* Select Button */}
              <div className="flex h-full items-center border-gray-700 md:border-l md:pl-8">
                <button
                  className={`rounded-full bg-black px-6 py-2 text-sm text-white transition duration-200 hover:bg-gray-600 md:text-base`}
                  // onClick={() => {
                  //   updatePlanData(
                  //     "package",
                  //     `${selectedOption} - ${pkg.name}`,
                  //   );
                  //   setSelectedPackage(pkg.name);
                  // }}
                >
                  {selectedPackage === pkg.name ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 lg:p-4">
      <h2 className="mb-4 text-center text-base font-bold md:text-xl lg:text-2xl">
        Choose your Package
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

      {selectedOption && selectedOption !== "Others" && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-4 lg:justify-center lg:space-x-6">
            {levels.map((level) => (
              <div
                key={level.name}
                className="group flex cursor-pointer items-center space-x-2 text-primary"
                onClick={() => handleLevelClick(level.name)}
              >
                <div
                  className={`w-auto rounded-full border border-primary p-2 shadow-lg shadow-gray-400 transition duration-300 ease-in-out ${
                    selectedLevel === level.name
                      ? "bg-primary text-white"
                      : "group-hover:bg-gray-100"
                  }`}
                >
                  {level.icon}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 shadow-lg shadow-gray-400 transition-colors duration-300 ease-in-out ${
                    selectedLevel === level.name
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
      )}

      {renderPackages()}
    </div>
  );
}
