"use client";
import { IDProperty } from "@/types/types";
import React, { useState, useRef, useEffect } from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

export default function Itinerary({
  data,
  packageName,
}: {
  //data: Array<{ id: number; day: string }>;
  data: IDProperty &
    Omit<
      {
        week?: number | undefined;
      } & {
        description: string;
        day: string;
      },
      never
    >[];
  packageName: string;
}) {
  const numberOfWeeks =
    data.length / 7 - Number((data.length / 7).toFixed(0)) <= 0
      ? Number((data.length / 7).toFixed(0))
      : Number((data.length / 7).toFixed(0)) + 1;
  //@ts-ignore
  const weeks = [...new Set(data?.map((item) => item?.week) || [])];

  const transformedData = Array.from({ length: numberOfWeeks }).map((_, i) => {
    return {
      week: `Week ${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
      days: data
        .slice(i * 7, i * 7 + 7)
        .map((item) => ({ day: `${item.day}`, desc: item.description })),
    };
  });
  const transformedData1 = weeks.map((i) => {
    return {
      week: `Week ${i < 10 ? `0${i}` : i}`,
      days: data
        .filter((j) => j.week === i)
        .map((item) => ({ day: item.day, desc: item.description })),
    };
  });

  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState(false);

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

  const getTargetElement = () => document.getElementById("pdfContent");

  const handleGeneratePDF = async () => {
    setIsLoading(true);
    try {
      await generatePDF(getTargetElement, {
        filename: `${packageName} Package`,
        method: "save",
        page: {
          orientation: "portrait",
          margin: Margin.SMALL,
        },
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl">
          Itinerary
        </h1>
        <button
          onClick={handleGeneratePDF}
          className="rounded border border-black px-4 py-2 text-sm text-black transition hover:bg-gray-200 md:text-base"
        >
          {isLoading ? <span>Downloading...</span> : <span>Download Pdf</span>}
        </button>
      </div>
      <div className="mt-4">
        <p className="text-base text-gray-600 lg:text-xl">
          <span className="font-bold">Weeks</span> ({weeks?.length})
        </p>
        <div className="ml-4 mt-4 space-y-6 border-l">
          {transformedData1.map((item, index) => (
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
                      <p
                        key={dayIndex}
                        className="mt-2 text-xs md:text-sm lg:text-base"
                      >
                        {`Day 0${day.day}`} &nbsp; {day.desc}
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
