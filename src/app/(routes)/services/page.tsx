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
export default function ServicesPage() {
  function getServices(n: number) {
    const d = Array.from({ length: n }, (_, i) => ({
      name: "Travel and Tour",
      image: serviceImg,
    }));
    console.log(d);
    return d;
  }
  const data = getServices(10);

  const [hideTabs, setHideTabs] = useState(false);
  const tabsTriggers = [
    {
      icon: <Mountain className="size-5 md:size-6" />,
      name: "Trekking",
    },
    {
      icon: <FaWalking className="size-6 md:size-6" />,
      name: "Peak Climbing",
    },
    {
      icon: <FaWalking className="size-6 md:size-6" />,
      name: "Peak Climbing",
    },
    {
      icon: <FaWalking className="size-6 md:size-6" />,
      name: "Peak Climbing",
    },
    {
      icon: <FaWalking className="size-6 md:size-6" />,
      name: "Peak Climbing",
    },
  ];

  const categoryTriggers = [
    {
      icon: <IoBusiness className="size-5 md:size-6" />,
      name: "Agency",
    },
    {
      icon: <FaPersonRays className="size-6 md:size-6" />,
      name: "Guide",
    },
    {
      icon: <FaBox className="size-6 md:size-6" />,
      name: "Packages",
    },
  ];
  return (
    <main className="container">
      <CommonBanner
        title="Services"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna "
      />

      <div className="flex flex-row gap-x-5">
        <Tabs
          defaultValue="about"
          className="relative z-10 flex flex-col items-stretch gap-x-10 gap-y-10 lg:flex-row"
        >
          <TabsList className="hidden h-fit w-full flex-col items-stretch gap-x-10 gap-y-10 bg-transparent md:flex md:w-fit md:flex-row">
            <div className="relative w-full">
              <div className="flex items-stretch gap-2 md:h-fit md:max-w-28 md:flex-col md:gap-4">
                <Button
                  className="rouned-2xl flex h-auto w-fit flex-row items-center gap-x-1 gap-y-1 border border-gray-400 bg-white text-black shadow-2xl hover:bg-white hover:text-primary md:h-fit md:w-full"
                  onClick={() => setHideTabs(!hideTabs)}
                >
                  <MdCleaningServices className="size-5 md:size-10" />
                  Services
                </Button>
                <div
                  className={cn(
                    hideTabs ? "scale-y-0" : "scale-y-100",
                    "hide-scrollbar relative flex h-fit w-full origin-top flex-row gap-y-2 overflow-x-scroll rounded-xl transition-transform ease-out md:w-full md:flex-col md:py-4",
                  )}
                >
                  {tabsTriggers.map((tab) => (
                    <TabsTrigger
                      key={`tab-${tab.name}`}
                      value={tab.name}
                      className="h-full capitalize data-[state=active]:!text-primary"
                      asChild
                    >
                      <Button className="flex h-full w-full flex-col items-center gap-y-1 bg-white py-4 text-black hover:bg-white hover:text-primary md:h-fit md:p-4">
                        {tab.icon}
                        <Text
                          variant="text-lg"
                          className="text-sm leading-tight lg:text-sm"
                        >
                          {tab.name}
                        </Text>
                      </Button>
                    </TabsTrigger>
                  ))}
                </div>
              </div>
            </div>
          </TabsList>
        </Tabs>
        <div className="flex flex-col gap-y-5">
          <Tabs
            defaultValue="about"
            className="relative z-10 flex w-fit flex-row items-stretch gap-x-10 gap-y-10 shadow-xl lg:flex-row"
          >
            <TabsList className="hidden h-fit w-full flex-col items-stretch gap-x-10 gap-y-10 bg-transparent md:flex md:w-fit md:flex-row">
              <div
                className={cn(
                  hideTabs ? "scale-y-0" : "scale-y-100",
                  "hide-scrollbar relative flex h-fit w-full origin-top flex-row gap-y-2 overflow-x-scroll rounded-xl transition-transform ease-out md:w-full md:py-4",
                )}
              >
                {categoryTriggers.map((tab) => (
                  <TabsTrigger
                    key={`tab-${tab.name}`}
                    value={tab.name}
                    className="h-full capitalize data-[state=active]:!text-primary"
                    asChild
                  >
                    <Button className="flex h-full w-full flex-col items-center gap-y-1 bg-white py-4 text-black hover:bg-white hover:text-primary md:h-fit md:p-4">
                      {tab.icon}
                      <Text
                        variant="text-lg"
                        className="text-sm leading-tight lg:text-sm"
                      >
                        {tab.name}
                      </Text>
                    </Button>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
          </Tabs>
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
