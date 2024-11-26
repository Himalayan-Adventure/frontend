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
  FaWalking,
} from "react-icons/fa";
import { FaMountainSun, FaPersonCircleQuestion } from "react-icons/fa6";
import { GiFlowerEmblem } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiMedalFill, PiMountainsFill } from "react-icons/pi";
const grades = [
  "Beginner (grade I)",
  "Intermediate (grade II)",
  "Challenging (grade III)",
  "Strenuous (grade IV)",
  "Extreme (grade V)",
];
type filter = {
  name: string;
  key:
    | "none"
    | "altitude"
    | "season"
    | "type"
    | "grade"
    | "difficultyLevel"
    | "fitness"
    | "planType";
  label: string;
  icon: JSX.Element;
  operator: "$gte" | "$eqi";
};
const gradeFilters: filter[] = grades.map((i, index) => ({
  name: (index + 4).toString(),
  label: i,
  key: "grade",
  icon: <MdOutlineWorkspacePremium className="size-6 md:size-8" />,
  operator: "$eqi",
}));
const filterCategories: filter[] = [
  // {
  //   name: "trekking",
  //   label: "Trekking",
  //   key: "planType",
  //   icon: <FaWalking className="size-6 md:size-8" />,
  //   operator: "$eqi",
  // },
  // {
  //   name: "climbing",
  //   label: "Peak Climbing",
  //   key: "planType",
  //   icon: <FaMountainSun className="size-6 md:size-8" />,
  //   operator: "$eqi",
  // },
  {
    label: "Expeditions 8000m",
    name: "8000",
    key: "altitude",
    icon: <MountainSnow className="size-6 md:size-8" />,
    operator: "$gte",
  },
  {
    label: "Expeditions 7000m",
    name: "7000",
    key: "altitude",
    icon: <FaMountain className="size-6 md:size-8" />,
    operator: "$gte",
  },
  {
    label: "Expeditions 6000m",
    name: "6000",
    key: "altitude",
    icon: <PiMountainsFill className="size-6 md:size-8" />,
    operator: "$gte",
  },
  {
    name: "winter",
    label: "Winter",
    key: "season",
    icon: <FaSnowflake className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "spring",
    label: "Spring",
    key: "season",
    icon: <GiFlowerEmblem className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "summer",
    label: "Summer",
    key: "season",
    icon: <FaSun className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "autumn",
    label: "Autumn",
    key: "season",
    icon: <FaLeaf className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "beginner",
    label: "Beginner",
    key: "fitness",
    icon: <FaPersonCircleQuestion className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "intermediate",
    label: "Intermediate",
    key: "fitness",
    icon: <FaStarHalfAlt className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "advanced",
    label: "Advanced",
    key: "fitness",
    icon: <FaStar className="size-6 md:size-8" />,
    operator: "$eqi",
  },

  {
    name: "elite",
    label: "Elite",
    key: "fitness",
    icon: <FaStar className="size-6 md:size-8" />,
    operator: "$eqi",
  },
  {
    name: "sedentary",
    label: "Sedentary",
    key: "fitness",
    icon: <FaStar className="size-6 md:size-8" />,
    operator: "$eqi",
  },

  // {
  //   name: "Basic",
  //   label: "Basic",
  //   key: "type",
  //   icon: <FaIcons className="size-6 md:size-8" />,
  //   operator: "$eqi",
  // },
  //
  // {
  //   name: "Premium",
  //   label: "Premium",
  //   key: "type",
  //   icon: <PiMedalFill className="size-6 md:size-8" />,
  //   operator: "$eqi",
  // },
  // {
  //   name: "Elite",
  //   label: "Elite",
  //   key: "type",
  //   icon: <MdOutlineWorkspacePremium className="size-6 md:size-8" />,
  //   operator: "$eqi",
  // },
];
filterCategories.push(...gradeFilters);
console.log(filterCategories);
export default filterCategories;
