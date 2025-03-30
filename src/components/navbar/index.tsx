"use client";

import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { InfoBar } from "./info-bar";

import { LazyMotion, domMax, m } from "framer-motion";
import { Navlinks } from "./nav-links";
export const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    if (window) {
      setScrollY(window.scrollY);
    }
  }, []);
  const scrollFn = (e: Event) => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFn);
    return () => window.removeEventListener("scroll", scrollFn);
  }, []);

  return (
    <LazyMotion features={domMax}>
      <m.div
        className={cn("sticky top-0 z-50 w-full")}
        initial={{
          opacity: 1,
          y: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        // animate={{
        //   paddingBottom:scrollY>20?'1em':'1em',
        // }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <div className="relative flex w-full flex-col">
          <InfoBar scrollY={scrollY} />
          <Navlinks scrollY={scrollY} />
        </div>
      </m.div>
    </LazyMotion>
  );
};
