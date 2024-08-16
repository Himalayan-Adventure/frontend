"use client";
import Image from "next/image";
import Logo from "../logo";
import Link from "next/link";
import { InfoBar } from "./info-bar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { useRef } from "react";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Packages",
      href: "/packages",
    },
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Our Team",
      href: "/our-team",
    },
  ];
  const router = useRouter();
  const pathname = usePathname();
  // for handling navlinks overflow in mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const overflowDir = useOverflowDetection(containerRef);

  return (
    <div className="sticky top-0 bg-black pb-4">
      <div className="flex w-full flex-col">
        <InfoBar />
        <nav className="container relative w-full">
          {overflowDir === "left" || overflowDir === "both" ? (
            <div className="absolute left-4 top-1/2 z-10 grid h-9 w-8 -translate-y-1/2 place-items-center bg-gradient-to-r from-black lg:hidden">
              <ChevronLeft className="animate-chevron-left absolute text-xl text-primary" />
            </div>
          ) : null}
          <div
            ref={containerRef}
            className="hide-scrollbar relative flex w-full justify-start gap-x-10 overflow-x-auto pb-6 text-white lg:justify-center"
          >
            {navLinks.map((navLink) => (
              <Link
                key={`nav-link-${navLink.name}`}
                href={navLink.href}
                className={cn(
                  pathname.includes(navLink.href) &&
                    "text-primary after:absolute after:-bottom-5 after:h-1 after:w-full after:bg-primary after:content-['']",
                  "relative",
                )}
              >
                <Text variant="text-xl" className="whitespace-nowrap text-sm">
                  {navLink.name}
                </Text>
              </Link>
            ))}
          </div>

          {overflowDir === "right" || overflowDir === "both" ? (
            <div className="absolute right-4 top-1/2 z-10 grid h-9 w-8 -translate-y-1/2 place-items-center bg-gradient-to-r from-transparent to-black lg:hidden">
              <ChevronRight className="animate-chevron-right absolute text-xl text-primary" />
            </div>
          ) : null}
        </nav>
      </div>
    </div>
  );
};
