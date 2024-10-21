"use client";
import PackagesList from "@/components/packagespage/packages-list";
import CommonBanner from "@/components/ui/common-banner";
import { Suspense, useState } from "react";
import serviceImg from "/public/images/travel.jpeg";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Heart, Menu, Mountain, Star } from "lucide-react";
import { IoBusiness } from "react-icons/io5";
import { FaPersonRays } from "react-icons/fa6";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { FaWalking } from "react-icons/fa";
import { MdCleaningServices } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { SideFilter, TopFilter } from "./filters";
export default function ServicesPage() {
  function getServices(n: number) {
    const d = Array.from({ length: n }, (_, i) => ({
      name: "Travel and Tour",
      image: serviceImg,
    }));
    return d;
  }
  const data = getServices(10);

  return (
    <main className="container">
      <CommonBanner
        title="Services"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna "
      />

      <div className="flex flex-row gap-x-5">
        <SideFilter />
        <div className="flex flex-col gap-y-5">
          <TopFilter />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.map((svc, index) => (
              <ServiceCard data={svc} key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const ServiceCard = ({
  data,
}: {
  data: { name: string; image: StaticImageData };
}) => {
  return (
    <div className="relative z-10 grid max-w-[300px] grid-rows-[auto_auto] rounded-lg bg-white p-3 shadow-xl">
      <div className="relative h-full">
        <Image
          src={data.image}
          alt={data.name}
          className="relative h-full w-full rounded-bl-2xl rounded-tr-2xl border border-gray-600 object-cover lg:max-h-96"
        />
        <span className="absolute right-2 top-2">
          <Heart size="16" className="cursor-pointer hover:text-primary" />
        </span>
      </div>
      <div className="relative flex w-full flex-col items-center gap-y-2 py-2 text-center">
        <span className="absolute right-2 flex items-center gap-x-1 text-primary">
          <Star size="16" />
          5.0
        </span>
        <Logo theme="light" className="mx-auto h-8 lg:h-auto" />
        <h2 className="mb-2 text-base font-semibold">{data.name}</h2>
        <div className="flex flex-col items-center space-y-3">
          <Button className="w-auto rounded-full px-6 py-1 text-xs text-white md:text-sm lg:px-12 lg:py-2">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
