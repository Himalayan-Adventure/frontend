import React from "react";
import {
  FaClock,
  FaLock,
  FaBan,
  FaSmokingBan,
  FaPaw,
  FaTimesCircle,
} from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import {
  MdCleaningServices,
  MdSocialDistance,
  MdSmokeFree,
  MdOutlineSecurity,
} from "react-icons/md";
import { RiAlarmWarningLine } from "react-icons/ri";

const thingsToKnowItems = [
  {
    title: "Expedition General Info",
    items: [
      { icon: <FaClock />, text: "Check-in: After 4:00 PM" },
      { icon: <FaClock />, text: "Checkout: 10:00 AM" },
      { icon: <FaLock />, text: "Self check-in with lockbox" },
      { icon: <FaBan />, text: "Not suitable for infants (under 2 years)" },
      { icon: <FaSmokingBan />, text: "No smoking" },
      { icon: <FaPaw />, text: "No pets" },
      { icon: <GiPartyPopper />, text: "No parties or events" },
    ],
  },
  {
    title: "Health & safety",
    items: [
      {
        icon: <MdCleaningServices />,
        text: "Committed to Airbnb's enhanced cleaning process.",
        link: "Show more",
      },
      {
        icon: <MdSocialDistance />,
        text: "Airbnb's social-distancing and other COVID-19-related guidelines apply",
      },
      { icon: <RiAlarmWarningLine />, text: "Carbon monoxide alarm" },
      { icon: <MdSmokeFree />, text: "Smoke alarm" },
      {
        icon: <MdOutlineSecurity />,
        text: "Security Deposit - if you damage the home, you may be charged up to $566",
      },
    ],
  },
  {
    title: "Cancellation policy",
    items: [{ text: "Free cancellation before Feb 14", link: "Show more" }],
  },
];

export default function ThingsToKnow() {
  return (
    <section className="container py-4 lg:py-8">
      <h2 className="mb-6 text-2xl font-semibold">Things to know</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {thingsToKnowItems.map(({ title, items }, index) => (
          <div key={index}>
            <h3 className="mb-4 font-semibold">{title}</h3>
            <ul className="space-y-2">
              {items.map(({ icon, text, link }: any, i) => (
                <li key={i} className="flex">
                  {icon && <span className="mr-2">{icon}</span>}
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
