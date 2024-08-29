"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import packageImg from "/public/images/package1.jpeg";
import { m, domMax, LazyMotion } from "framer-motion";
const packages = [
  {
    name: "Expedition Over 8000m",
    image: packageImg,
  },
  {
    name: "Expedition Over 8000m",
    image: packageImg,
  },
  {
    name: "Peak Climbing",
    image: packageImg,
  },
  {
    name: "Trekking",
    image: packageImg,
  },
];

export default function ExplorePackages() {
  return (
    <LazyMotion features={domMax}>
      <m.section
        className="py-8 lg:py-16"
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          {/* Heading */}
          <div className="flex lg:justify-center lg:text-center">
            <div className="lg:max-w-4xl">
              <h1 className="comp-heading">Explore Packages</h1>
              <p className="comp-subheading mt-2 lg:mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
            </div>
          </div>
          {/* Packages Grid */}
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-16">
            {packages.map((pkg, index) => (
              <div key={index} className="">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  className="aspect-[0.65] h-auto max-h-96 w-full rounded-2xl border border-gray-600 object-cover lg:max-h-none"
                />
                <div className="py-2 text-center">
                  <h2 className="mb-2 text-base font-semibold lg:text-xl">
                    {pkg.name}
                  </h2>
                  <div className="flex flex-col items-center space-y-3">
                    <Button className="w-auto rounded-full border border-black bg-transparent px-6 py-1 text-xs text-black hover:bg-black hover:text-white md:text-sm lg:px-12 lg:py-2">
                      Inquire
                    </Button>
                    <Button className="w-auto rounded-full px-6 py-1 text-xs text-white md:text-sm lg:px-12 lg:py-2">
                      View More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
