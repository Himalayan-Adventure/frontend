"use client";
import React, { useState } from "react";
import { LuStar } from "react-icons/lu";
import { Button } from "../ui/button";
import { MdTimelapse } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";
import Link from "next/link";
import { seasonIconMap, seasonMonthMap } from "@/config/ui-constants";
import { formatDate } from "@/lib/utils";
import wordsToNumbers from "words-to-numbers";
import { DepartureProps } from "@/types/packages/departure";
import { Flag } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Departure({
  data,
  type = "default",
  id,
}: DepartureProps) {
  const { duration, season, altitude, grade, departure } = data;
  const maxAltInM = Number(
    wordsToNumbers(altitude)?.toString().split(" ").join(""),
  );

  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleButtonClick = (packageType: string) => {
    setSelectedPackage(packageType);
  };

  const departureFacts = [
    {
      title: season,
      desc: seasonMonthMap[season],
      icon: seasonIconMap[season],
    },
    {
      title: "duration",
      desc: duration + " days",
      icon: <MdTimelapse size={20} />,
    },
    {
      title: "grade",
      desc: grade,
      icon: <BsBarChartFill size={20} />,
    },
    {
      title: "max altitude",
      desc: `${maxAltInM.toLocaleString(
        "en-us",
      )}m/${(maxAltInM * 3.281).toLocaleString("en-us")}ft`,
      icon: <FaMountain size={20} />,
    },
  ];

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
          {departure &&
            departure?.filter((i) => i.start || i.end).length > 0 && (
              <div className="my-2 rounded border bg-white p-2">
                {departure?.map((i, index) => (
                  <div
                    className="mt-2 flex items-center justify-between"
                    key={`departure-${index}`}
                  >
                    <div className="">
                      <p className="text-xs text-black">Date</p>
                      <p
                        className="text-sm text-gray-500"
                        key={`departure-${index}`}
                      >
                        {formatDate(i?.start as string)} -{" "}
                        {formatDate(i?.end as string)}
                      </p>
                    </div>

                    <Button className="rounded-full bg-black px-4 py-1 text-xs text-white">
                      Book Now
                    </Button>
                  </div>
                ))}
              </div>
            )}

          <Dialog>
            {/* Trigger Buttons */}
            <div className="mt-4 flex flex-col items-center justify-center gap-4 md:mt-8">
              <DialogTrigger asChild>
                <button
                  className="w-48 rounded-lg border border-black py-2 text-black transition hover:bg-gray-100 md:w-60"
                  onClick={() => handleButtonClick("Standard")}
                >
                  Standard
                </button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <button
                  className="w-48 rounded-lg bg-primary py-2 text-white transition hover:bg-orange-600 md:w-60"
                  onClick={() => handleButtonClick("Premium")}
                >
                  Premium
                </button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <button
                  className="w-48 rounded-lg bg-black py-2 text-white transition hover:bg-gray-800 md:w-60"
                  onClick={() => handleButtonClick("Luxury")}
                >
                  Luxury
                </button>
              </DialogTrigger>
            </div>

            {/* Dialog Content */}
            <DialogContent className="!md:py-16 max-w-2xl !rounded-2xl p-8 md:px-12">
              <DialogHeader>
                {/* Package Selection Buttons */}
                <DialogTitle>
                  <div className="flex w-full gap-2">
                    {["Standard", "Premium", "Luxury"].map((pkg) => (
                      <button
                        key={pkg}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`w-full rounded-lg px-4 py-2 text-sm text-white transition md:px-8 ${
                          selectedPackage === pkg ? "bg-primary" : "bg-black"
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </DialogTitle>

                {/* Package Details */}
                <DialogDescription>
                  <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row md:gap-12">
                    {/* Inclusions */}
                    <div className="w-full rounded-3xl border border-gray-100 p-8 shadow-2xl">
                      <h3 className="font-poppins tracking-widest text-black md:text-lg md:font-light">
                        Inclusions
                      </h3>
                      <ul className="ml-3 mt-4 list-disc font-poppins tracking-wider font-light text-gray-700 sm:mb-8">
                        <li>Inclusion 1 for {selectedPackage}.</li>
                        <li>Inclusion 2 for {selectedPackage}.</li>
                        <li>Inclusion 3 for {selectedPackage}.</li>
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="w-full rounded-3xl border border-gray-100 p-8 shadow-2xl">
                      <h3 className="font-poppins tracking-widest text-black md:text-lg md:font-light">
                        Exclusions
                      </h3>
                      <ul className="ml-3 mt-4 list-disc font-poppins tracking-wider font-light text-gray-700 sm:mb-8">
                        <li>Exclusion 1 for {selectedPackage}.</li>
                        <li>Exclusion 2 for {selectedPackage}.</li>
                        <li>Exclusion 3 for {selectedPackage}.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-center">
                    <button className="w-48 rounded-lg bg-primary p-2 font-medium text-white">
                      Get Quote
                    </button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <hr className="my-4" />
          <button className="w-full rounded-lg bg-primary py-2 font-semibold text-white hover:bg-orange-500">
            Get Quote
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <p className="mb-4 text-center text-sm">You won’t be charged yet</p>
          {season && (
            <DepartureFact
              title={season}
              desc={seasonMonthMap[season]}
              icon={seasonIconMap[season]}
            />
          )}
          {duration && (
            <DepartureFact
              title={"duration"}
              desc={duration + " days"}
              icon={<MdTimelapse size={20} />}
            />
          )}
          {grade && (
            <DepartureFact
              title="grade"
              desc={grade}
              icon={<BsBarChartFill size={20} />}
            />
          )}
          {maxAltInM && maxAltInM !== 0 && (
            <DepartureFact
              title="max altitude"
              desc={`${maxAltInM.toLocaleString(
                "en-us",
              )}m/${(maxAltInM * 3.281).toLocaleString("en-us")}ft`}
              icon={<FaMountain size={20} />}
            />
          )}
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
        <Link
          href="#"
          className="z-10 mx-auto hidden w-fit gap-x-2 underline lg:flex"
        >
          <Flag size={16} />
          <span className="text-sm tracking-wide">Report this listing</span>
        </Link>
      )}
    </div>
  );
}

export const DepartureFact = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      {icon}
      <span className="flex items-center gap-x-1">
        <p className="font-semibold capitalize">{title}:</p>
        {desc}
      </span>
    </div>
  );
};
