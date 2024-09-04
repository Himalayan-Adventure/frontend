"use client";
import React, { useState } from "react";
import {
  FaLeaf,
  FaWifi,
  FaDotCircle,
  FaRegBuilding,
  FaToolbox,
  FaBone,
  FaFire,
  FaVideo,
  FaBiking,
  FaHiking,
  FaFirstAid,
  FaMap,
} from "react-icons/fa";

export default function Offers() {
  const allServices = [
    { icon: FaLeaf, name: "Experience Guides" },
    { icon: FaWifi, name: "Airport Receive" },
    { icon: FaDotCircle, name: "Logistic" },
    { icon: FaRegBuilding, name: "Hotel Booking" },
    { icon: FaToolbox, name: "Tools and Gears" },
    { icon: FaBone, name: "Transportation" },
    { icon: FaFire, name: "Porters" },
    { icon: FaVideo, name: "Emergency Rescue" },
    { icon: FaBiking, name: "Food and beverage" },
    { icon: FaHiking, name: "Guided Hiking" }, // New Service
    { icon: FaFirstAid, name: "First Aid Services" }, // New Service
    { icon: FaMap, name: "Custom Itinerary Planning" }, // New Service
  ];

  const [showAll, setShowAll] = useState(false);

  const servicesToShow = showAll ? allServices : allServices.slice(0, 8);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section className="container py-4 lg:py-8">
      <div className="max-w-3xl">
        <h2 className="mb-6 text-lg font-semibold md:text-xl lg:text-2xl">
          What We Offer.
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {servicesToShow.map((service, index) => (
            <div key={index} className="flex items-center space-x-3">
              <service.icon className="text-xl" />
              <span className="text-sm md:text-base lg:text-lg">
                {service.name}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={toggleShowAll}
          className="mt-6 rounded-lg border border-black px-4 py-2 text-black hover:bg-gray-200"
        >
          {showAll ? "Show less" : "Show all services"}
        </button>
      </div>
    </section>
  );
}
