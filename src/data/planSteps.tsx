import AccomodationSelection from "@/components/plan-page/accomodation-selection";
import BudgetSelection from "@/components/plan-page/budget-selection";
import CustomizeExperience from "@/components/plan-page/customize-experience";
import DateSelection from "@/components/plan-page/date-selection";
import DestinationSelection from "@/components/plan-page/destination-selction";
import PackageSelection from "@/components/plan-page/package-selection";
import ReviewFinal from "@/components/plan-page/review-final";
import Travel from "@/components/plan-page/travel";
import { BsArchive, BsBriefcase, BsMap } from "react-icons/bs";
import { FaRegMoneyBillAlt, FaTripadvisor } from "react-icons/fa";
import { IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
import { TfiUser } from "react-icons/tfi";

export const stepsData = [
  {
    step: "Travel",
    icons: <TfiUser />,
    description:
      "Start by entering your travel details, like the number of people going. It helps personalize your trip based on who is traveling. This way, everything is tailored to fit your group’s needs.",
    content: <Travel />,
  },
  {
    step: "Travel Dates",
    icons: <IoCalendarOutline />,
    description:
      "Choose when you want to travel. Picking the right start and end dates helps with planning and availability. It ensures that you travel on the best days for your schedule.",
    content: <DateSelection />,
  },
  {
    step: "Destination",
    icons: <BsMap />,
    description:
      "Select where you want to go. The destination sets the stage for your entire trip. Make sure it’s a place that excites you!",
    content: <DestinationSelection />,
  },
  // {
  //   step: "Package",
  //   icons: <BsArchive />,
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
  //   content: <PackageSelection />,
  // },
  {
    step: "Accommodation",
    icons: <IoHomeOutline />,
    description:
      "Choose where you’ll stay during your trip. Whether it’s a hotel, hostel, or villa, picking the right accommodation makes your stay more comfortable. Your lodging choice depends on your budget and preferences.",
    content: <AccomodationSelection />,
  },
  {
    step: "Budget",
    icons: <FaRegMoneyBillAlt />,
    description:
      "Set a budget for your trip. Knowing how much you want to spend helps guide your travel decisions. It ensures you don’t overspend and stick to what you can afford.",
    content: <BudgetSelection />,
  },
  {
    step: "Experience",
    icons: <BsBriefcase />,
    description:
      "Customize the activities you want to experience during your trip. Whether you prefer adventure, relaxation, or cultural activities, choose what suits you best. This makes your trip memorable and exciting.",
    content: <CustomizeExperience />,
  },
  {
    step: "ReviewFinal",
    icons: <MdOutlinePreview />,
    description:
      "Review all your choices before finalizing the plan. Check everything, from dates to destinations, to make sure it’s perfect. Once confirmed, you’re ready to go!",
    content: <ReviewFinal />,
  },
];
