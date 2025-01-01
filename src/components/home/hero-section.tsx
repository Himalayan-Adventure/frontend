"use client";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Search } from "lucide-react";
import Image from "next/image";
import climberImage from "/public/images/climber-bg.png";
import cloudImage from "/public/images/cloud.png";
import bgImage from "/public/images/home-bg-1.png";
import lhotseImage from "/public/images/lhotse.png";

import { stagger, domMax, LazyMotion, m, useAnimate } from "framer-motion";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";

import { Input } from "../ui/input";
export function HeroSection() {
  const router = useRouter();
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (openSearch) {
      const controls = animate([
        [scope.current, {}],
        ["svg", { scale: ["1", "1.05", "1"] }, { delay: stagger(0.1) }],
        [
          "p",
          {
            opacity: 0,
            display: "none",
            scale: 0,
          },
        ],
        [
          "input",
          {
            opacity: 1,
            // width: ["0", "10%", "100%"],
            padding: "0.5rem",
            display: "block",
            scale: "1",
          },
          { delay: stagger(0.4, { startDelay: 0.4 }) },
        ],
      ]);

      controls.speed = 1.5;

      return () => controls.stop();
    }
  }, [openSearch]);
  useEffect(() => {
    if (openSearch) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current?.focus();
        }
      }, 1000);
    }
  }, [openSearch]);
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

        {/* Search bar */}
        <m.header
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="container relative top-5 z-10 flex flex-col gap-y-4 text-white sm:top-[calc(var(--navbar-height)+2em)] sm:items-center sm:gap-y-10"
        >
          <Text
            variant="display-lg"
            className="text-left text-lg font-black capitalize tracking-wide sm:text-center md:text-2xl lg:text-4xl 2xl:text-[50px]"
          >
            Not sure where to go? Perfect.
          </Text>
          <m.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
            <Button
              ref={scope}
              //onClick={() => router.push("/packages")}
              onClick={() => setOpenSearch(!openSearch)}
              className="group flex w-fit items-center gap-x-4 rounded-full border border-white bg-transparent px-6 py-6 text-white hover:gap-x-5 hover:bg-transparent sm:w-auto md:px-10 md:py-8"
            >
              <Search />
              <Input
                ref={inputRef}
                type="text"
                //placeholder="Find your Adventure"
                className="hidden scale-0 rounded-none border-none bg-transparent p-0 leading-none text-white placeholder:text-base placeholder:font-bold group-hover:text-white sm:h-16"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push("/packages?title=" + e.currentTarget.value);
                  }
                }}
              />
              <Text variant="text-md" bold>
                Find your Adventure
              </Text>
            </Button>
          </m.div>
        </m.header>
      </section>
    </LazyMotion>
  );
}
