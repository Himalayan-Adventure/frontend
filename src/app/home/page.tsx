import WhatWeDo from "@/components/home/what-we-do";
import Seasons from "@/components/home/seasons";
import HomeCarousel from "@/components/home/carousel";
import WhyUs from "@/components/home/why-us";
import ExplorePackages from "@/components/home/explore-packages";
import Services from "@/components/home/services";
import PopularDestinations from "@/components/home/popular-destinations";
import Testimonials from "@/components/home/testimonials";
import BookAppointment from "@/components/home/book-appointment";
import { HeroSection } from "@/components/home/hero-section";
import { socialIcons } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";

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
      <WhyUs />
      <ExplorePackages />
      <Services />
      <BookAppointment />
      <PopularDestinations />
      <Testimonials />
    </main>
  );
}
