"use client";
import { IDProperty } from "@/types/types";
import React, { useState } from "react";
import DynamicReactIcon from "../icons/strapi-icon";
import { IconContext } from "react-icons";

export default function Offers({
  data,
}: {
  data: Omit<
    {
      title?: string | undefined;
      offer_info?:
        | (IDProperty &
            Omit<
              {
                title?: string | undefined;
                details?: string | undefined;
                icon?: string | undefined;
              } & {},
              never
            >[])
        | undefined;
    } & {},
    never
  >;
}) {
  // const allServices = [
  //   { icon: FaLeaf, name: "Experience Guides" },
  //   { icon: FaWifi, name: "Airport Receive" },
  //   { icon: FaDotCircle, name: "Logistic" },
  //   { icon: FaRegBuilding, name: "Hotel Booking" },
  //   { icon: FaToolbox, name: "Tools and Gears" },
  //   { icon: FaBone, name: "Transportation" },
  //   { icon: FaFire, name: "Porters" },
  //   { icon: FaVideo, name: "Emergency Rescue" },
  //   { icon: FaBiking, name: "Food and beverage" },
  //   { icon: FaHiking, name: "Guided Hiking" }, // New Service
  //   { icon: FaFirstAid, name: "First Aid Services" }, // New Service
  //   { icon: FaMap, name: "Custom Itinerary Planning" }, // New Service
  // ];

  const [showAll, setShowAll] = useState(
    data?.offer_info ? data?.offer_info?.length <= 8 : false,
  );

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section className="container py-4 lg:py-8">
      <div className="max-w-3xl">
        <h2 className="mb-6 text-lg font-semibold md:text-xl lg:text-2xl">
          {data.title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 lg:mt-8 lg:grid-cols-2">
            {(showAll ? data.offer_info : data.offer_info?.slice(0, 8))?.map(
              (offer, index) => (
                <div key={index} className="mb-2 flex items-start gap-x-3">
                  <div className="flex items-start gap-x-3">
                    {offer.icon && (
                      <IconContext.Provider
                        value={{
                          color: "#FD9100",
                        }}
                      >
                        <DynamicReactIcon
                          className="size-5 md:size-6"
                          name={offer.icon}
                        />
                      </IconContext.Provider>
                    )}
                    <p className="text-sm leading-none md:text-base lg:text-lg lg:leading-none">
                      {offer?.title}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        {data?.offer_info && data?.offer_info?.length > 8 && (
          <button
            onClick={toggleShowAll}
            className="mt-6 rounded-lg border border-black px-4 py-2 text-black hover:bg-gray-200"
          >
            {showAll ? "Show less" : "Show all services"}
          </button>
        )}
      </div>
    </section>
  );
}
