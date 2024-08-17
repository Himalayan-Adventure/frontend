/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image"; // Import if using Next.js's Image component
import Link from "next/link";

export default function WhatWeDo() {
  return (
    <section className="container mx-auto py-8">
      <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
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
          <h2 className="mb-4 text-3xl font-bold lg:text-5xl">What We Do</h2>
          <p className="mb-6 text-lg text-gray-700 lg:text-2xl">
            "Embark on epic adventures with us. From thrilling expeditions to
            breathtaking treks, we curate unforgettable experiences. Our expert
            guides lead you through nature's wonders, ensuring safety and
            satisfaction every step of the way."
          </p>
          <p className="flex justify-center lg:justify-start">
            <Link
              href="/learn-more"
              className="inline-block rounded-full border border-black px-4 py-2 font-semibold text-black transition"
            >
              Learn More
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
