"use client";

import { Text } from "@/components/ui/text";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InfoBar } from "./info-bar";

import { LazyMotion, domMax, m } from "framer-motion";
import { navLinks } from "@/config/navbar-links"
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
        className={cn("sticky top-0 z-[100] w-full pb-4")}
        initial={{
          opacity: 1,
          y: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <div className="flex w-full flex-col">
          <InfoBar scrollY={scrollY} />
          <Navlinks scrollY={scrollY} />
        </div>
      </m.div>
    </LazyMotion>
  );
};


const Navlinks = ({ scrollY }: { scrollY: number }) => {
  const pathname = usePathname();
  // for handling navlinks overflow in mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const overflowDir = useOverflowDetection(containerRef);
  const [curScrollX, setCurScrollX] = useState(0);
  useEffect(() => {
    const scrollFn = (e: Event) => {
      setCurScrollX(containerRef?.current?.scrollLeft || 0);
    };
    containerRef?.current?.addEventListener("scroll", scrollFn);
    return () => containerRef?.current?.removeEventListener("scroll", scrollFn);
  }, []);
  return (
    <m.nav
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: scrollY < 20 ? 1 : 0,
        y: scrollY < 20 ? 0 : '-100%',
        pointerEvents: scrollY < 20 ? "auto" : "none",
      }}
      exit={{ opacity: 0, top: -10 }}
      className="container relative w-full"
    >
      {overflowDir === "left" || overflowDir === "both" ? (
        <div className="absolute left-4 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black shadow-lg shadow-white/10 lg:hidden">
          <ChevronLeft
            className="animate-chevron-left absolute text-xl text-primary"
            onClick={() =>
              containerRef?.current?.scroll({
                top: 0,
                left: curScrollX - 150,
                behavior: "smooth",
              })
            }
          />
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="hide-scrollbar relative flex w-full justify-start gap-x-4 overflow-x-auto pb-2 text-white sm:gap-x-10 md:justify-center lg:pb-6"
      >
        {navLinks.map((navLink) => (
          <Link
            key={`nav-link-${navLink.name}`}
            href={navLink.href}
            className={cn(
              "relative",
              pathname.includes(navLink.href) &&
                "text-primary after:absolute after:-bottom-2 after:h-1 after:w-full after:bg-primary after:content-[''] lg:after:-bottom-5",
            )}
          >
            <Text variant="text-xl" className="whitespace-nowrap text-sm">
              {navLink.name}
            </Text>
          </Link>
        ))}
      </div>

      {overflowDir === "right" || overflowDir === "both" ? (
        <div className="absolute right-4 top-1/2 z-10 grid aspect-square h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black shadow-xl shadow-white/10 lg:hidden">
          <ChevronRight
            className="animate-chevron-right absolute text-xl text-primary"
            onClick={() =>
              containerRef?.current?.scroll({
                top: 0,
                left: curScrollX + 150,
                behavior: "smooth",
              })
            }
          />
        </div>
      ) : null}
    </m.nav>
  );
};
