import BookAppointment from "@/components/home/book-appointment";
//import HomeCarousel from "@/components/home/carousel";
import ExplorePackages from "@/components/home/explore-packages";
import { HeroSection } from "@/components/home/hero-section";
import PopularDestinations from "@/components/home/popular-destinations";
import Services from "@/components/home/services";
import Testimonials from "@/components/home/testimonials";
import WhatWeDo from "@/components/home/what-we-do";
import WhyUs from "@/components/home/why-us";
import { socialIcons } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import HomeCarousel from "@/components/home/home-carousel/index";

export const metadata: Metadata = {
  title: `Home | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};

export default async function Home() {
  return (
    <main>
      <aside className="fixed right-2 top-1/2 z-20 hidden h-screen -translate-y-1/2 flex-col justify-center gap-y-2 lg:flex">
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
      </aside>
      <HeroSection />
      <WhatWeDo />
      <HomeCarousel />

      {/* <HomeCarousel /> */}
      <WhyUs />
      <ExplorePackages />
      <Services />
      <BookAppointment />
      <PopularDestinations />
      <Testimonials />
    </main>
  );
}
