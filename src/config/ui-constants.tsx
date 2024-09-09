import { BsBarChartFill, BsCloudHail } from "react-icons/bs";
import {
  FaCanadianMapleLeaf,
  FaMountain,
  FaRegSnowflake,
  FaRegSun,
} from "react-icons/fa";
export const seasonMonthMap: { [key: string]: string } = {
  winter: "December - February",
  spring: "March - May",
  summer: "June - August",
  autumn: "September - November",
};

export const seasonIconMap: { [key: string]: any } = {
  winter: <FaRegSnowflake />,
  summer: <FaRegSun strokeWidth={1} size={20} />,
  monsoon: <BsCloudHail />,
  autumn: <FaCanadianMapleLeaf />,
};
