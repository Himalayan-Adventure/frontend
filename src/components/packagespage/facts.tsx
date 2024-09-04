"use client";

import { BsFillCalendarCheckFill, BsFillPeopleFill } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaCar,
  FaCloudSun,
  FaCompass,
  FaFlag,
  FaHiking,
  FaHotel,
  FaMapMarkerAlt,
  FaMountain,
  FaPlane,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdOutlineLocationOn, MdOutlineSevereCold } from "react-icons/md";

/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
const CloudImage = ({ src, alt, position }: any) => (
  <div className={`absolute ${position} w-full`}>
    <Image src={src} alt={alt} width={1920} height={150} className="w-full" />
  </div>
);

const factsLeft = [
  {
    label: "Highest access:",
    value: "8,848.86m (29,032 ft)",
    icon: <FaMountain />,
  },
  { label: "Duration:", value: "65 Days", icon: <FaCalendarAlt /> },
  {
    label: "Co-ordinates:",
    value: "27°59'17'' N/86°55'31'' E",
    icon: <FaCompass />,
  },
  { label: "Country:", value: "Nepal", icon: <FaFlag /> },
  { label: "Departure From:", value: "Kathmandu Airport", icon: <FaPlane /> },
  {
    label: "Accommodation:",
    value: "Three star to five star as request",
    icon: <FaHotel />,
  },
  {
    label: "Transportation:",
    value: "Vehicle and domestic flight",
    icon: <FaCar />,
  },
  {
    label: "Major Activity:",
    value: "Trekking/Mountaineering",
    icon: <FaHiking />,
  },
  { label: "Culture:", value: "Sherpa and Tamang", icon: <FaUsers /> },
  {
    label: "Climbing route:",
    value: "South east ridge (Normal route)",
    icon: <FaMapMarkerAlt />,
  },
];

const factsRight = [
  {
    label: "First Ascent:",
    value: "May 29, 1953 Edmund Hillary & Tenzing Norgay Sherpa",
    icon: <BsFillCalendarCheckFill />,
  },
  {
    label: "Group Size:",
    value: "08-10 persons per group",
    icon: <BsFillPeopleFill />,
  },
  {
    label: "Location:",
    value: "Nepal/Tibet border",
    icon: <MdOutlineLocationOn />,
  },
  { label: "Airport:", value: "Kathmandu Airport", icon: <FaPlane /> },
  { label: "Grade:", value: "Challenging", icon: <MdOutlineSevereCold /> },
  {
    label: "Meals:",
    value: "B/B plan in Kathmandu & B, I, D during trekking and climbing",
    icon: <FaUtensils />,
  },
  {
    label: "Best season:",
    value: "Spring Season (April, May)",
    icon: <FaCloudSun />,
  },
  {
    label: "Include Activity:",
    value: "Trekking/Mountaineering",
    icon: <FaHiking />,
  },
  { label: "Mode of Travel:", value: "Tea House/Camping", icon: <FaHotel /> },
  {
    label: "Himalayan sights:",
    value: "Lhotse, Makalu, Ama Dablam, Cho-Oyu",
    icon: <FaMountain />,
  },
];

export default function BookAppointment() {
  return (
    <section
      className="relative my-8 flex min-h-screen items-center bg-cover bg-center bg-no-repeat lg:my-16"
      style={{
        backgroundImage: "url('/images/factsBg.png')",
        filter: "grayscale(100%)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="from-gray absolute top-0 h-20 w-full bg-gradient-to-b"></div>
      <div className="container py-8 lg:py-16">
        <div className="relative text-white">
          <h1 className="text-lg md:text-xl lg:text-2xl">Facts of the Trip</h1>
          <div className="mt-8 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
            <div>
              {factsLeft.map((fact, index) => (
                <div key={index} className="mb-4 flex items-center space-x-3">
                  <p className="text-sm font-semibold md:text-base">
                    {fact.label}
                  </p>

                  <div className="flex items-center space-x-1">
                    <span className="text-primary">{fact.icon}</span>

                    <p className="text-sm md:text-base">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {factsRight.map((fact, index) => (
                <div
                  key={index}
                  className="mb-4 flex items-center space-x-2 md:space-x-3"
                >
                  <p className="text-sm font-semibold md:text-base">
                    {fact.label}
                  </p>

                  <div className="flex items-center space-x-1">
                    <span className="text-primary">{fact.icon}</span>

                    <p className="text-sm md:text-base">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CloudImage
        src="/images/cloudup.png"
        alt="cloud"
        position="left-0 top-0 lg:-top-12"
      />
      <CloudImage
        src="/images/cloud.png"
        alt="cloud"
        position="bottom-0 left-0 lg:-bottom-10"
      />
    </section>
  );
}
