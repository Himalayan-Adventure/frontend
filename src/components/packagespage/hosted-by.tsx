import React from "react";
import Logo from "../logo";
import Link from "next/link";
import Image from "next/image";
import hostLogo from "/public/images/pioneer.png";

export default function HostedBy() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
      <div className="space-y-2">
        <h1 className="text-sm md:text-lg">
          Package Hosted by Piioneer Adventure
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-base md:gap-8 lg:gap-12">
          <h2 className="text-sm md:text-base">5 Climbers Booked</h2>
          <ul className="ml-2 md:ml-0 flex list-disc space-x-8 text-xs md:text-sm lg:text-base">
            <li>2 leaders</li>
            <li>Fixed Departure</li>
            <li>Season: Autumn</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Pioneer Adventure Logo  */}
        <p className="sr-only">Himalayan Adventures logo</p>
        <Image src={hostLogo} alt="logo" priority className="w-28 md:w-40" />
      </div>
    </div>
  );
}
