"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import DynamicReactIcon from "../icons/strapi-icon";
import { LazyMotion, domMax, m } from "framer-motion";

export default function Services({ services }: { services: any }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="py-8 lg:py-16"
      >
        <section className="container lg:px-24">
          <div className="text-center text-lg font-[600] uppercase md:text-2xl lg:text-[40px]">
            <h2>Services We Offer</h2>
            <div className="mt-3 flex justify-center lg:mt-6">
              <div className="h-1 w-40 rounded-xl bg-black" />
            </div>
          </div>

          {/* Grid Layout with Middle Card Taller */}
          <div className="mt-10 grid items-center gap-4 md:grid-cols-3 md:gap-8 lg:gap-16">
            {/* First Service Card (always visible) */}
            <div className="lg:p-2">
              <div className="rounded-lg border-2 border-gray-800 p-3 py-8 text-center lg:p-6 lg:py-10">
                <div className="mb-4 flex justify-center lg:mb-8">
                  <DynamicReactIcon
                    name={services?.[0]?.icon}
                    className="text-[32px] lg:text-[50px]"
                  />
                </div>
                <h3 className="font-semibold md:text-lg lg:text-xl">
                  {services[0].title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {services[0].description}
                </p>
              </div>
            </div>

            {services.slice(1).map((service: any, index: number) => (
              <div
                key={index}
                className={`lg:p-2 ${!showMore && "hidden md:block"}`}
              >
                <div
                  className={`rounded-lg border-2 border-gray-800 p-3 py-8 text-center ${
                    index % 3 === 0 ? "lg:p-10 lg:py-16" : "lg:p-6 lg:py-10"
                  }`}
                >
                  <div className="mb-4 flex justify-center lg:mb-8">
                    <DynamicReactIcon
                      name={service.icon}
                      className="text-[32px] lg:text-[50px]"
                    />
                  </div>
                  <h3 className="font-semibold md:text-lg lg:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button for small screens */}
          <div className="mt-6 flex md:hidden">
            <button
              className="flex items-center space-x-1 text-sm underline"
              onClick={() => setShowMore(!showMore)}
            >
              <span>{showMore ? "Show Less" : "Show More"}</span>{" "}
              <FaChevronRight size={12} />
            </button>
          </div>
        </section>
      </m.section>
    </LazyMotion>
  );
}
