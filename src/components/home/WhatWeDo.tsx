/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image"; 
import Link from "next/link";

export default function WhatWeDo() {
  return (
    <section className="container py-8 lg:py-16">
      <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <Image
            src="/images/whatwedo.png"
            alt="What We Do"
            width={400}
            height={300}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="comp-heading mb-4">What We Do</h2>
          <p className="comp-subheading mb-6">
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
