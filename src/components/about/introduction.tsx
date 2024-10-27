"use client";
/* eslint-disable @next/next/no-img-element */
import { socialIcons } from "@/config/constants";
import { LazyMotion, domMax, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Introduction({ description, image }: any) {
  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="lg:py-16"
      >
        <section className="container relative grid gap-4 md:gap-8 lg:grid-cols-3 lg:gap-16 lg:px-24">
          <div className="flex items-center lg:col-span-1">
            <div className="lg:min-h-60 w-full">
              <Image
                src={image}
                alt="About Us"
                width={500}
                height={500}
                className="h-full w-full rounded-ee-3xl rounded-ss-3xl grayscale md:object-contain lg:min-h-[480px] lg:rounded-ee-[50px] lg:rounded-ss-[50px] lg:object-cover"
              />
            </div>
          </div>
          <div className="py-2 lg:col-span-2">
            <h2 className="text-lg font-[600] uppercase md:text-2xl lg:text-[40px]">
              About Us
            </h2>
            <div className="space-y-4 text-sm text-gray-700 md:text-lg">
              <p className="mt-4 lg:mt-8">{description}</p>
            </div>
            <div className="mt-4 text-sm text-gray-700 md:text-lg lg:mt-8">
              <p>Follow our work on:</p>
              <div className="mt-2 flex gap-2 md:mt-4">
                {socialIcons.map((item) => (
                  <Link
                    key={`social-link-${item.name}`}
                    href={item.href}
                    target="_blank"
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.name} Icon`}
                      className="h-auto w-4 md:w-8"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </m.section>
    </LazyMotion>
  );
}
