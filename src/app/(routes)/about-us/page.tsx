import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/packagesBanner.png";
import Logo, { BlackLogo } from "@/components/logo";
import Introduction from "@/components/about/introduction";
import Services from "@/components/about/services";
import Projects from "@/components/about/projects";
import ClientsReviews from "@/components/about/clients-reivews";
import Contact from "@/components/about/contact";

export default function AboutUs() {
  return (
    <main>
      <CommonBanner title="About Us" bgImage={bgImage} />
      <div className="container relative -mt-8 hidden w-full justify-center pb-8 lg:-mt-16 lg:flex">
        <BlackLogo />
      </div>
      <div className="container relative -mt-8 flex w-full pb-8 lg:-mt-16 lg:hidden">
        <Logo />
      </div>
      <Introduction />
      <Services />
      <Projects />
      <ClientsReviews />
      <Contact />
    </main>
  );
}
