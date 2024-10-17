"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaPaintBrush } from "react-icons/fa";

export default function Services() {
  return (
    <section className="container py-8 lg:px-24 lg:py-16">
      <div className="text-center text-2xl font-[600] uppercase lg:text-[40px]">
        <h2>Services We Offer</h2>
        <div className="mt-3 flex justify-center lg:mt-6">
          <div className="h-1 w-40 rounded-xl bg-black" />
        </div>
      </div>

      {/* Grid Layout with Middle Card Taller */}
      <div className="mt-10 grid items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-16">
        {/* First Service Card */}
        <div className="lg:p-2">
          <div className="rounded-lg border-2 border-gray-800 p-3 py-8 text-center lg:p-6 lg:py-10">
            <div className="mb-4 flex justify-center">
              <FaPaintBrush className="text-[30px] text-gray-600 lg:text-[50px]" />
            </div>
            <h3 className="text-lg font-semibold lg:text-xl">Lorem Ipsum</h3>
            <p className="tetx-sm text-gray-600 lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* second  */}
        <div>
          <div className="rounded-lg border-2 border-gray-800 p-3 py-8 text-center lg:p-10 lg:py-14">
            <div className="mb-4 flex justify-center">
              <FaPaintBrush className="text-[30px] text-gray-600 lg:text-[50px]" />
            </div>
            <h3 className="mb-2 text-xl font-semibold lg:mb-4">Lorem Ipsum</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Third Service Card */}
        <div className="lg:p-2">
          <div className="rounded-lg border-2 border-gray-800 p-3 py-8 text-center lg:p-6 lg:py-10">
            <div className="mb-4 flex justify-center">
              <FaPaintBrush className="text-[30px] text-gray-600 lg:text-[50px]" />
            </div>
            <h3 className="text-xl font-semibold">Lorem Ipsum</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
