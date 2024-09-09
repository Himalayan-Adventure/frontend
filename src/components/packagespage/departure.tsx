import React from "react";
import { LuStar } from "react-icons/lu";
import { Button } from "../ui/button";
import { MdTimelapse } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";
import Link from "next/link";

export default function Departure() {
  return (
    <div className="rounded-lg border p-2 shadow-xl shadow-gray-300 lg:p-4">
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
              <p className="text-sm text-gray-500">07 Apr 2022 - 31 May 2022</p>
            </div>
            <Button className="rounded-full bg-black px-4 py-1 text-xs text-white">
              Book Now
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="">
              <p className="text-xs text-black">Date</p>
              <p className="text-sm text-gray-500">07 Apr 2022 - 31 May 2022</p>
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
          {/* {seasonMap[attr?.season]} */}
          <span className="capitalize">Winter: (October-December)</span>
        </p>
        <p className="flex items-center space-x-2 text-sm font-medium">
          <MdTimelapse size={20} />
          <span>Duration: 55 days</span>
        </p>
        <p className="flex items-center space-x-2 text-sm font-medium">
          <BsBarChartFill size={20} />
          <span>Grade: Challenging</span>
        </p>
        <p className="flex items-center space-x-2 text-sm font-medium">
          <FaMountain size={20} />
          <span>Max Altitude: 8,586m/28,169ft</span>
        </p>
      </div>

      <hr className="mx-auto mt-2 w-[90%]" />
    </div>
  );
}
