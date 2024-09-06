import React from "react";
import { LuStar } from "react-icons/lu";
import { Button } from "../ui/button";
import { MdTimelapse } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";
import Link from "next/link";
import { seasonIconMap, seasonMonthMap } from "@/config/ui-constants";
import { formatDate } from "@/lib/utils";
import { Text } from "../ui/text";
import wordsToNumbers from "words-to-numbers";
import { DepartureProps } from "@/types/packages/departure";
import { Flag } from "lucide-react";
export default function Departure({
  data,
  type = "default",
  id,
}: DepartureProps) {
  const { date, duration, season, altitude, grade, departure } = data;
  console.log(wordsToNumbers(altitude)?.toString().split(" ").join(""));

  return (
    <div className="relative space-y-4">
      <div className="relative rounded-lg border p-2 shadow-xl shadow-gray-300 lg:p-4">
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Departure</p>
            <p className="flex items-center space-x-1 text-sm">
              <span>
                <LuStar className="text-primary" />
              </span>
              <span>{Math.floor(Math.random() * 5)}</span>
              <span className="text-xl text-gray-400">·&nbsp;</span>
              <a href="#" className="underline">
                {Math.floor(Math.random() * 100)} reviews
              </a>
            </p>
          </div>
          <div className="my-2 rounded border bg-white p-2">
            <div className="mt-2 flex items-center justify-between">
              <div className="">
                <p className="text-xs text-black">Date</p>
                <p className="text-sm text-gray-500">
                  {formatDate(departure)} - {formatDate(date)}
                </p>
              </div>
              <Button className="rounded-full bg-black px-4 py-1 text-xs text-white">
                Book Now
              </Button>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-primary py-2 font-semibold text-white hover:bg-orange-500">
            Get Quote
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <p className="mb-4 text-center text-sm">You won’t be charged yet</p>
          <p className="flex items-center space-x-2 text-sm font-medium">
            {seasonIconMap[season]}
            <span className="capitalize">
              {season}: ({seasonMonthMap[season]})
            </span>
          </p>
          <p className="flex items-center space-x-2 text-sm font-medium">
            <MdTimelapse size={20} />
            <span>Duration: {wordsToNumbers(duration)} days</span>
          </p>
          <p className="flex items-center space-x-2 text-sm font-medium">
            <BsBarChartFill size={20} />
            <span>Grade: {grade}</span>
          </p>
          <p className="flex items-center space-x-2 text-sm font-medium">
            <FaMountain size={20} />
            <span>
              Max Altitude:{" "}
              {wordsToNumbers(altitude)?.toString().split(" ").join("")}m
            </span>
          </p>
        </div>

        {type === "card" && (
          <>
            <hr className="mx-auto mt-2 w-[90%]" />
            <div className="flex w-full justify-center">
              <Link
                href={`packages/${id}`}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
              >
                View Details
              </Link>
            </div>
          </>
        )}
      </div>

      {type === "default" && (
        <div className="z-10 mx-auto hidden w-fit gap-x-2 underline lg:flex">
          <Flag size={16} />
          <Text variant="text-sm" className="w-fit text-sm">
            Report this listing
          </Text>
        </div>
      )}
    </div>
  );
}
