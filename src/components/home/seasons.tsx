"use client";
import React from "react";
import Image from "next/image";
import { m, domMax, LazyMotion } from "framer-motion";
const seasons = [
  { name: "Spring", imageSrc: "/images/spring.png" },
  { name: "Summer", imageSrc: "/images/summer.png" },
  { name: "Autumn", imageSrc: "/images/autumn.png" },
  { name: "Winter", imageSrc: "/images/winter.png" },
];

export default function Seasons() {
  return (
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
            Discover beautiful destinations and travel ideas for every season of
            the year. Explore the perfect getaways for spring, summer, fall, and
            winter.
          </p>
          <div className="mt-4 flex flex-wrap justify-around gap-1 sm:justify-start sm:gap-2 md:gap-4 lg:mt-8">
            {seasons.map((season) => (
              <div key={season.name} className="flex flex-col">
                <div className="flex h-16 w-16 items-center overflow-hidden sm:h-24 sm:w-24 lg:h-40 lg:w-52">
                  <Image
                    src={season.imageSrc}
                    alt={season.name}
                    width={150}
                    height={150}
                    className="w-16 object-cover md:w-auto"
                  />
                </div>
                <p className="text-sm font-semibold md:text-lg lg:text-2xl">
                  {season.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
