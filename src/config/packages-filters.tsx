import { MountainSnow } from "lucide-react";
import {
  FaBorderAll,
  FaIcons,
  FaLeaf,
  FaMountain,
  FaSnowflake,
  FaStar,
  FaStarHalfAlt,
  FaSun,
  FaWalking
} from "react-icons/fa";
import { FaMountainSun, FaPersonCircleQuestion } from "react-icons/fa6";
import { GiFlowerEmblem } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiMedalFill, PiMountainsFill } from "react-icons/pi";

export const filterCategories: Array<{
  name: string;
  key:
    | "none"
    | "altitude"
    | "season"
    | "type"
    | "grade"
    | "difficultyLevel"
    | "planType";
  label: string;
  icon: JSX.Element;
}> = [
  {
    name: "All",
    label: "All",
    key: "none",
    icon: <FaBorderAll className="size-6 md:size-8" />,
  },

  {
    name: "trekking",
    label: "Trekking",
    key: "planType",
    icon: <FaWalking className="size-6 md:size-8" />,
  },
  {
    name: "climbing",
    label: "Peak Climbing",
    key: "planType",
    icon: <FaMountainSun className="size-6 md:size-8" />,
  },
  {
    label: "Expeditions 8000m",
    name: "8000",
    key: "altitude",
    icon: <MountainSnow className="size-6 md:size-8" />,
  },
  {
    label: "Expeditions 7000m",
    name: "7000",
    key: "altitude",
    icon: <FaMountain className="size-6 md:size-8" />,
  },
  {
    label: "Expeditions 6000m",
    name: "6000",
    key: "altitude",
    icon: <PiMountainsFill className="size-6 md:size-8" />,
  },
  {
    name: "winter",
    label: "Winter",
    key: "season",
    icon: <FaSnowflake className="size-6 md:size-8" />,
  },
  {
    name: "spring",
    label: "Spring",
    key: "season",
    icon: <GiFlowerEmblem className="size-6 md:size-8" />,
  },
  {
    name: "summer",
    label: "Summer",
    key: "season",
    icon: <FaSun className="size-6 md:size-8" />,
  },
  {
    name: "autumn",
    label: "Autumn",
    key: "season",
    icon: <FaLeaf className="size-6 md:size-8" />,
  },
  {
    name: "beginner",
    label: "Beginner",
    key: "difficultyLevel",
    icon: <FaPersonCircleQuestion className="size-6 md:size-8" />,
  },
  {
    name: "intermediate",
    label: "Intermediate",
    key: "difficultyLevel",
    icon: <FaStarHalfAlt className="size-6 md:size-8" />,
  },
  {
    name: "experienced",
    label: "Experienced",
    key: "difficultyLevel",
    icon: <FaStar className="size-6 md:size-8" />,
  },

  {
    name: "Basic",
    label: "Basic",
    key: "type",
    icon: <FaIcons className="size-6 md:size-8" />,
  },

  {
    name: "Premium",
    label: "Premium",
    key: "type",
    icon: <PiMedalFill className="size-6 md:size-8" />,
  },
  {
    name: "Elite",
    label: "Elite",
    key: "type",
    icon: <MdOutlineWorkspacePremium className="size-6 md:size-8" />,
  },
];
