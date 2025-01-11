"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { APIResponseCollection } from "@/types/types";
import { m, domMax, LazyMotion } from "framer-motion";
import { useState } from "react";
import PackageCard from "@/components/packagespage/package-card/index";
import { PackageCardSkeleton } from "@/components/packagespage/package-card-skeleton";
import { Text } from "@/components/ui/text";
import {
  AutumnIcon,
  SpringIcon,
  SummerIcon,
  WinterIcon,
} from "@/components/icons/seasons";
type TSeason = "spring" | "summer" | "autumn" | "winter" | "all";
export default function SliderComponent({
  data,
}: {
  data?: APIResponseCollection<"api::package.package">;
}) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const seasonsIconMap = [
    { name: "spring", icon: <SpringIcon /> },
    { name: "summer", icon: <SummerIcon /> },
    { name: "autumn", icon: <AutumnIcon /> },
    { name: "winter", icon: <WinterIcon /> },
  ];
  const [activeSeason, setActiveSeason] = useState<TSeason>("all");
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

      {!data?.data || data?.data.length === 0 ? (
        <Text variant="text-lg" className="text-center text-shadow-sm">
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
                        className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
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
