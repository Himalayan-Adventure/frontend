"use client";
import Image from "next/image";
import bgImage from "/public/images/home-bg-1.png";
import cloudImage from "/public/images/cloud.png";
import lhotseImage from "/public/images/lhotse.png";
import climberImage from "/public/images/climber-bg.png";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { socialIcons } from "@/config/constants";

import { m, domMax, LazyMotion } from "framer-motion";
export function HeroSection() {
  return (
    <LazyMotion features={domMax}>
      <section className="flex h-[calc(50dvh-var(--navbar-height))] flex-col sm:h-[80vh] sm:overflow-hidden">
        {/*
        overlay images
      */}
        <div className="absolute left-0 top-0 h-[50dvh] w-full sm:h-screen sm:overflow-hidden">
          <Image
            src={bgImage}
            alt="Home horizon image"
            className="absolute left-0 top-0 h-full w-full sm:h-screen"
          />

          <m.div
            initial={{ opacity: 0, x: "-50px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute bottom-[15%] left-0 h-1/2 w-auto object-contain mix-blend-color-dodge sm:bottom-10 sm:h-[90vh]"
          >
            <Image
              src={climberImage}
              alt="Climber Image"
              className="relative h-full w-full object-contain"
              priority
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, x: "50px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute bottom-10 right-0 h-full w-auto object-cover md:bottom-0 md:h-screen md:w-full"
          >
            <Image
              src={lhotseImage}
              alt="Lhoste Image"
              priority
              className="relative h-full w-full object-cover"
            />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: "-50px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="absolute bottom-0 left-0 hidden h-1/2 w-full object-cover mix-blend-hard-light sm:bottom-0 sm:block sm:mix-blend-normal md:-bottom-10 md:h-[60vh]"
          >
            <Image
              src={cloudImage}
              alt="Cloud Image"
              className="relative h-full w-full object-cover"
            />
          </m.div>

          <Image
            src={cloudImage}
            alt="Cloud Image"
            className="absolute bottom-0 left-0 h-1/2 w-full object-cover mix-blend-hard-light sm:bottom-0 sm:hidden sm:mix-blend-normal md:-bottom-10 md:h-[60vh]"
          />
        </div>

        {/*
        Social icons
      */}
        {/* <aside className="absolute right-2 top-1/2 z-20 hidden h-screen -translate-y-1/2 flex-col justify-center gap-y-2 lg:flex">
          {socialIcons.map((item) => (
            <Link
              key={`social-link-${item.name}`}
              href={item.href}
              target="_blank"
            >
              <Image
                src={item.icon}
                alt={`${item.name} Icon`}
                className="h-auto w-12"
              />
            </Link>
          ))}
        </aside> */}
        <m.header
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container relative top-5 z-10 flex flex-col gap-y-4 text-white sm:top-[calc(var(--navbar-height)+2em)] sm:items-center sm:gap-y-10"
        >
          <Text
            variant="display-lg"
            className="text-left text-lg font-black capitalize tracking-wide sm:text-center md:text-2xl lg:text-4xl 2xl:text-[50px]"
          >
            Not sure where to go? Perfect.
          </Text>
          <Button className="flex w-fit items-center gap-x-4 rounded-full border border-white bg-transparent px-6 py-6 text-white sm:w-auto md:px-10 md:py-8">
            <Search />
            <Text variant="text-md" bold>
              Find your Adventure
            </Text>
          </Button>
        </m.header>
      </section>
    </LazyMotion>
  );
}
