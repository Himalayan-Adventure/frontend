"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { m, domMax, LazyMotion } from "framer-motion";
const CloudImage = ({ src, alt, position }: any) => (
  <div className={`absolute ${position} w-full`}>
    <Image src={src} alt={alt} width={1920} height={150} className="w-full" />
  </div>
);

export default function BookAppointment() {
  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative my-8 flex min-h-[60vh] items-center bg-cover bg-center bg-no-repeat lg:my-16 lg:min-h-[80vh]"
        style={{
          backgroundImage: "url('/images/experts.jpeg')",
          filter: "grayscale(100%)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="from-gray absolute top-0 h-20 w-full bg-gradient-to-b"></div>
        <div className="container py-8 lg:py-16">
          <div className="relative z-10 text-white lg:text-center">
            <h1 className="comp-heading mb-6">Talk to Experts</h1>
            <Button className="rounded-full border border-white bg-transparent px-6 py-4 text-base text-white lg:text-xl">
              Book An Appointment
            </Button>
          </div>
        </div>

        <CloudImage
          src="/images/cloudup.png"
          alt="cloud"
          position="left-0 top-0 lg:-top-12"
        />
        <CloudImage
          src="/images/cloud.png"
          alt="cloud"
          position="bottom-0 left-0 lg:-bottom-10"
        />
      </m.section>
    </LazyMotion>
  );
}
