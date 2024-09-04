"use client";
import React, { useState, useRef, useEffect } from "react";

const itineraryData = [
  {
    week: "Week 01",
    days: [
      "Day 01. Arrival in Kathmandu & transfer to the hotel (1,300m/4,265ft)",
      "Day 02. Arrival in Kathmandu & transfer to the hotel (1,300m/4,265ft)",
    ],
  },
  {
    week: "Week 02",
    days: [
      "Day 01. Explore Kathmandu, visit Pashupatinath and Boudhanath Stupas",
      "Day 02. Fly to Lukla (2,800m/9,186ft) & trek to Phakding (2,652m/8,700ft)",
    ],
  },
  {
    week: "Week 03",
    days: [
      "Day 01. Trek to Namche Bazaar (3,440m/11,286ft)",
      "Day 02. Acclimatization day in Namche Bazaar",
    ],
  },
];

export default function Itinerary() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.height =
          expandedWeek === index ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [expandedWeek]);

  const toggleAccordion = (index: number) => {
    setExpandedWeek((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
          Itinerary
        </h1>
        <button className="rounded border border-black px-4 py-2 text-black transition hover:bg-gray-200">
          Download Pdf
        </button>
      </div>
      <div className="mt-4">
        <p className="text-lg text-gray-600 lg:text-xl">
          <span className="font-bold">Weeks</span> ({itineraryData.length})
        </p>
        <div className="ml-4 mt-4 space-y-6 border-l">
          {itineraryData.map((item, index) => (
            <div key={index}>
              <div
                className="flex cursor-pointer space-x-4 lg:space-x-8"
                onClick={() => toggleAccordion(index)}
              >
                <div className="relative -ml-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-white">
                    <p className="text-gray-500">{index + 1}</p>
                  </div>
                </div>
                <div
                  className={`relative flex-grow bg-gray-100 p-4 transition-all duration-300 ease-in-out ${
                    expandedWeek === index ? "mb-4 shadow-lg" : ""
                  }`}
                >
                  <div className="absolute -left-1 top-2 -z-10 h-5 w-5 rotate-45 bg-gray-100"></div>
                  <p className="text-base font-bold text-primary lg:text-lg">
                    {item.week}
                  </p>
                  <div
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ height: "0px" }}
                  >
                    {item.days.map((day, dayIndex) => (
                      <p key={dayIndex} className="mt-2">
                        {day}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
