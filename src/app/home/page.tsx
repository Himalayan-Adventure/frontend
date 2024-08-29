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
import WhatWeDo from "@/components/home/what-we-do";
import Seasons from "@/components/home/seasons";
import HomeCarousel from "@/components/home/carousel";
import WhyUs from "@/components/home/why-us";
import ExplorePackages from "@/components/home/explore-packages";
import Services from "@/components/home/services";
import PopularDestinations from "@/components/home/popular-destinations";
import Testimonials from "@/components/home/testimonials";
import BookAppointment from "@/components/home/book-appointment";
export default function Home() {
  return (
    <main>
      {/*
       Hero section
      */}
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
          <Image
            src={climberImage}
            alt="Climber Image"
            className="absolute bottom-[15%] left-0 h-1/2 w-auto object-contain mix-blend-color-dodge sm:bottom-10 sm:h-[90vh]"
          />
          <Image
            src={lhotseImage}
            alt="Lhoste Image"
            className="absolute bottom-10 right-0 h-full w-auto object-cover md:bottom-0 md:h-screen md:w-full"
          />
          <Image
            src={cloudImage}
            alt="Cloud Image"
            className="absolute bottom-0 left-0 h-1/2 object-cover mix-blend-hard-light sm:bottom-0 sm:mix-blend-normal md:-bottom-10 md:h-[60vh]"
          />
        </div>

        {/*
        Social icons
      */}
        <aside className="absolute right-2 top-1/2 z-20 hidden h-screen -translate-y-1/2 flex-col justify-center gap-y-2 lg:flex">
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
        <header className="container relative top-5 z-10 flex flex-col gap-y-4 text-white sm:top-[calc(var(--navbar-height)+2em)] sm:items-center sm:gap-y-10">
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
        </header>
      </section>
      <WhatWeDo />
      <Seasons />
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
