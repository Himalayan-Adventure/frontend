"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { m, domMax, LazyMotion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import { PiHeadsetLight } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import Image from "next/image";
import WhyUsMan from "/public/images/whyus/whyusMan.png";

const features = [
  {
    icon: TbTruckDelivery,
    heading: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: PiHeadsetLight,
    heading: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: RiSecurePaymentLine,
    heading: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

const FeatureItem = ({
  Icon,
  heading,
  description,
}: {
  Icon: React.ElementType;
  heading: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center text-white">
    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white md:mb-4 lg:h-16 lg:w-16">
      <Icon className="h-4 w-4 text-gray-800 md:h-8 md:w-8" />
    </div>
    <h3 className="font-semibold md:text-lg lg:text-xl">{heading}</h3>
    <p className="text-sm text-gray-200">{description}</p>
  </div>
);

const CloudImage = ({ src, alt, position }: any) => (
  <div className={`absolute ${position} w-full`}>
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={150}
      className="w-full"
      unoptimized
    />
  </div>
);
export default function Benefits() {
  return (
    <LazyMotion features={domMax}>
      <section className="relative my-8 flex min-h-[60vh] items-center bg-cover bg-center bg-no-repeat lg:my-16 lg:min-h-[80vh]">
        <Image
          src={WhyUsMan}
          alt="why-us-man"
          quality={60}
          className="absolute top-0 h-full w-full grayscale"
        />
        <div className="from-gray absolute top-0 h-20 w-full bg-gradient-to-b"></div>
        <m.div
          initial={{ opacity: 0, y: "-10%" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5 }}
          className="container py-8 lg:py-16"
        >
          <div className="relative z-10 text-white lg:text-center">
            <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:px-16">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  Icon={feature.icon}
                  heading={feature.heading}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </m.div>

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
      </section>
    </LazyMotion>
  );
}
