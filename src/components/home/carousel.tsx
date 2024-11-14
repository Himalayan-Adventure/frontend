"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { APIResponseCollection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { m, domMax, LazyMotion } from "framer-motion";
import { useEffect, useState } from "react";
import PackageCard from "../packagespage/package-card";
import { PackageCardSkeleton } from "../packagespage/package-card-skeleton";
import { Text } from "../ui/text";
import {
  AutumnIcon,
  SpringIcon,
  SummerIcon,
  WinterIcon,
} from "../icons/seasons";
type TSeason = "spring" | "summer" | "autumn" | "winter" | "all";
export default function HomeCarousel() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const seasons = [
    { name: "spring", imageSrc: "/images/spring.png" },
    { name: "summer", imageSrc: "/images/summer.png" },
    { name: "autumn", imageSrc: "/images/autumn.png" },
    { name: "winter", imageSrc: "/images/winter.png" },
  ];

  const seasonsIconMap = [
    { name: "spring", icon: <SpringIcon /> },
    { name: "summer", icon: <SummerIcon /> },
    { name: "autumn", icon: <AutumnIcon /> },
    { name: "winter", icon: <WinterIcon /> },
  ];
  const [activeSeason, setActiveSeason] = useState<TSeason>("all");
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::package.package">
  >({
    queryKey: ["packages"],
    queryFn: async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?populate=*`,
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
  });
  const toggleFavorite = (index: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(index)
        ? prevFavorites.filter((favIndex) => favIndex !== index)
        : [...prevFavorites, index],
    );
  };
  return (
    <section>
      <LazyMotion features={domMax}>
        <m.section
          initial={{ opacity: 0, y: "-10%" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "all" }}
          transition={{ duration: 0.6 }}
          className="container py-8 lg:py-16"
        >
          <div>
            <h1 className="comp-heading mb-4">
              Find Travel Inspiration by Seasons
            </h1>
            <p className="comp-subheading mb-6 max-w-3xl">
              Discover beautiful destinations and travel ideas for every season
              of the year. Explore the perfect getaways for spring, summer,
              fall, and winter.
            </p>
            <div className="relative mt-4 flex justify-start gap-1 sm:gap-2 md:gap-4 lg:mt-8">
              {seasonsIconMap.map((season) => (
                <div
                  key={season.name}
                  className="relative size-20 cursor-pointer gap-x-4 md:size-40 md:max-w-[192px] md:scale-100 md:gap-x-6 md:overflow-x-hidden lg:gap-x-10"
                  onClick={() =>
                    season.name !== activeSeason
                      ? setActiveSeason(season.name as TSeason)
                      : setActiveSeason("all")
                  }
                >
                  {React.cloneElement(season.icon, {
                    isActive: activeSeason === season.name,
                  })}
                </div>
              ))}
            </div>
          </div>
        </m.section>
      </LazyMotion>

      {status === "pending" ? (
        <PackageCardSkeleton />
      ) : status === "error" ? (
        <Text variant="text-lg" className="text-center">
          No packages found
        </Text>
      ) : (
        <LazyMotion features={domMax}>
          <m.section
            initial={{ opacity: 0, y: "-10%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5 }}
            className="container flex justify-center py-8 lg:py-16"
          >
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {activeSeason === "all"
                  ? data?.data.map((pkg, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/4"
                      >
                        <PackageCard pkg={pkg} variant="home" />
                      </CarouselItem>
                    ))
                  : data.data
                      ?.filter(
                        (pkg) =>
                          pkg?.attributes?.adventure_specification?.season?.[0]
                            ?.name === activeSeason,
                      )
                      .map((pkg, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/4"
                        >
                          <PackageCard pkg={pkg} variant="home" />
                        </CarouselItem>
                      ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </m.section>
        </LazyMotion>
      )}
    </section>
  );
}
