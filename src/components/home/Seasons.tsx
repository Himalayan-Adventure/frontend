import React from "react";
import Image from "next/image";

const seasons = [
  { name: "Spring", imageSrc: "/images/spring.png" },
  { name: "Summer", imageSrc: "/images/summer.png" },
  { name: "Autumn", imageSrc: "/images/autumn.png" },
  { name: "Winter", imageSrc: "/images/winter.png" },
];

export default function Seasons() {
  return (
    <section className="container py-8 lg:py-16">
      <div>
        <h1 className="comp-heading mb-4">
          Find Travel Inspiration by Seasons
        </h1>
        <p className="comp-subheading mb-6 max-w-3xl">
          Discover beautiful destinations and travel ideas for every season of
          the year. Explore the perfect getaways for spring, summer, fall, and
          winter.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 lg:mt-8">
          {seasons.map((season) => (
            <div key={season.name} className="flex flex-col">
              <div className="flex h-24 w-24 items-center overflow-hidden lg:h-40 lg:w-52">
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
    </section>
  );
}
