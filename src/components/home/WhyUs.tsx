/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

const features = [
  {
    src: "/images/whyus/experience.png",
    alt: "Feature 1",
    text: "Wealth of Experience"
  },
  {
    src: "/images/whyus/guides.png",
    alt: "Feature 2",
    text: "Experienced Guides"
  },
  {
    src: "/images/whyus/reliable.png",
    alt: "Feature 3",
    text: "Reliable And Credible"
  },
  {
    src: "/images/whyus/support.png",
    alt: "Feature 4",
    text: "24/7 Customer Support"
  }
];

const FeatureItem = ({ src, alt, text }: any) => (
  <div className="flex flex-col items-center text-black">
    <Image src={src} alt={alt} width={80} height={80} className="mb-2 object-cover" />
    <h3 className="text-sm md:text-lg font-semibold">{text}</h3>
  </div>
);

const CloudImage = ({ src, alt, position }: any) => (
  <div className={`absolute ${position} w-full`}>
    <Image src={src} alt={alt} width={1920} height={150} className="w-full" />
  </div>
);

export default function WhyUs() {
  return (
    <>
      <section
        className="relative my-8 flex min-h-[60vh] lg:min-h-[80vh] items-center bg-cover bg-center bg-no-repeat lg:my-16"
        style={{ backgroundImage: "url('/images/whyus/whyusMan.png')", filter: "grayscale(100%)" }}
      >
        <div className="absolute top-0 h-20 w-full bg-gradient-to-b from-gray"></div>
        <div className="container py-8 lg:py-16">
          <div className="relative z-10 max-w-md text-white lg:text-center">
            <h1 className="mb-6 text-xl font-bold md:text-2xl lg:text-5xl">Why Us?</h1>
            <p className="mb-8 text-lg lg:text-2xl">
              "Choose us for unparalleled expedition experiences. With seasoned
              guides, decades of experience, and unwavering reliability, we
              offer credible adventures. Count on our dedicated customer support
              for a journey of a lifetime."
            </p>
          </div>
        </div>

        <CloudImage src="/images/cloudup.png" alt="cloud" position="left-0 top-0 lg:-top-12" />
        <CloudImage src="/images/cloud.png" alt="cloud" position="bottom-0 left-0 lg:-bottom-10" />

        {/* Feature Items on Top of Bottom Cloud */}
        <div className="container absolute inset-x-0 bottom-0 hidden lg:block">
          <div className="grid grid-cols-2 bg-transparent px-8 lg:grid-cols-4 lg:px-16">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container lg:hidden">
          <div className="grid grid-cols-2 gap-4 bg-transparent">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}