import React from "react";
import Image from "next/image"; // Import if using Next.js's Image component

const seasons = [
  { name: "Spring", imageSrc: "/images/spring.png" },
  { name: "Summer", imageSrc: "/images/summer.png" },
  { name: "Autumn", imageSrc: "/images/autumn.png" },
  { name: "Winter", imageSrc: "/images/winter.png" },
];

export default function Seasons() {
  return (
    <section className="container py-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold lg:text-5xl">
          Find Travel Inspiration by Seasons
        </h1>
        <p className="mb-6 max-w-3xl text-lg text-gray-700 lg:text-2xl">
          Discover beautiful destinations and travel ideas for every season of
          the year. Explore the perfect getaways for spring, summer, fall, and
          winter.
        </p>
        <div className="mt-4 flex flex-wrap space-x-4 space-y-4 lg:mt-8">
          {seasons.map((season) => (
            <div key={season.name} className="flex flex-col space-x-4">
              <div className="flex h-24 w-24 items-center overflow-hidden lg:h-48 lg:w-60">
                <Image
                  src={season.imageSrc}
                  alt={season.name}
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-lg font-semibold lg:text-2xl">
                {season.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
