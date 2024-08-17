/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image"; // Import if using Next.js's Image component
import Link from "next/link";

export default function WhatWeDo() {
  return (
    <section className="container mx-auto py-8">
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <Image
            src="/images/whatwedo.png" // Replace with your image path
            alt="What We Do"
            width={400}
            height={300}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">What We Do</h2>
          <p className="text-lg lg:text-2xl text-gray-700 mb-6">
            "Embark on epic adventures with us. From thrilling expeditions to
            breathtaking treks, we curate unforgettable experiences. Our expert
            guides lead you through nature's wonders, ensuring safety and
            satisfaction every step of the way."
          </p>
          <p className="flex">
            <Link
              href="/learn-more"
              className="inline-block py-2 px-4 border border-black text-black font-semibold rounded-full  transition"
            >
              Learn More
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
