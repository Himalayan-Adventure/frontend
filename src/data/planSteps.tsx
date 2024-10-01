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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <Travel />,
  },
  {
    step: "Travel Dates",
    icons: <IoCalendarOutline />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <DateSelection />,
  },
  {
    step: "Destination",
    icons: <BsMap />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <DestinationSelection />,
  },
  {
    step: "Package",
    icons: <BsArchive />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <PackageSelection />,
  },
  {
    step: "Accommodation",
    icons: <IoHomeOutline />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <AccomodationSelection />,
  },
  {
    step: "Budget",
    icons: <FaRegMoneyBillAlt />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <BudgetSelection />,
  },
  {
    step: "Experience",
    icons: <BsBriefcase />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <CustomizeExperience />,
  },
  {
    step: "ReviewFinal",
    icons: <MdOutlinePreview />,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula lorem dolor, vitae malesuada elit porta quis. Phasellus quis arcu in metus scelerisque gravida et sed lectus. Mauris accumsan dui quis nisi cursus, ac scelerisque tellus efficitur. Curabitur condimentum, justo a hendrerit euismod, turpis magna efficitur justo, vitae consequat purus quam non neque. Nullam dictum dapibus tortor eget bibendum. Quisque pellentesque odio et velit efficitur congue. Pellentesque nec orci in urna tempus aliquet non eget orci.Maecenas nulla dui, tincidunt eget accumsan rhoncus, facilisis eu ex.",
    content: <ReviewFinal />,
  },
];
