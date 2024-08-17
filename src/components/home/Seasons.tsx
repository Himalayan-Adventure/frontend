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
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Find Travel Inspiration by Seasons
        </h1>
        <p className="text-lg lg:text-2xl text-gray-700 mb-6 max-w-3xl">
          Discover beautiful destinations and travel ideas for every season of
          the year. Explore the perfect getaways for spring, summer, fall, and
          winter.
        </p>
        <div className="flex space-x-4 mt-4 lg:mt-8">
          {seasons.map((season) => (
            <div key={season.name} className="flex flex-col  space-x-4">
              <div className="w-24 lg:w-60 h-24 lg:h-48 flex items-center  overflow-hidden">
                <Image
                  src={season.imageSrc}
                  alt={season.name}
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-lg lg:text-2xl font-semibold">{season.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
