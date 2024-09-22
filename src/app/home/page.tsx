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
import { getMe } from "@/server/auth/get-me";

export default async function Home() {
  return (
    <main>
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
