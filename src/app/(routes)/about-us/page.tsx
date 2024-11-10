import ClientsReviews from "@/components/about/clients-reivews";
import Contact from "@/components/about/contact";
import Introduction from "@/components/about/introduction";
import Projects from "@/components/about/projects";
import { BlackLogo } from "@/components/logo";
import CommonBanner from "@/components/ui/common-banner";
import { getAboutUs } from "@/server/about-us/get-aboutUs";
import bgImage from "/public/images/packagesBanner.png";

const AboutUs = async () => {
  const data = await getAboutUs();

  if (!data || !data.data || !data.data.attributes) {
    return <CommonBanner title="Something Went Wrong" bgImage={bgImage} />;
  }

  return (
    <main className="font-poppins">
      <CommonBanner title="About Us" bgImage={bgImage} />
      <div className="container relative flex w-full justify-center pb-8 lg:mt-32">
        <BlackLogo />
      </div>

      <Introduction
        description={data?.data?.attributes?.description}
        // image={data?.data?.attributes?.image?.data?.[0]?.attributes?.url}
        image="https://s3-alpha-sig.figma.com/img/003a/9308/e8555ac899347748bf58aa4467d1acc8?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qXmmbV3i8LDcW7fRWChCZgM14f7TvNcZ7Oic2oyNzuB~hirPgfF1Hum6iu2L9JxabuZPwNH8ms8q7Oqh-~wgckiJzy6e0ovKHjlCABGVydgcDUbTOEogBG1h0YsCMXcwngPLqbIXLCjQjz6VZJXtCgRDGepFICWh9G7yEKpozb0zGhSlv7i-ggoVUWOgBfjNWM-6deZL87nxpRCnPHNQh3qx2m1qdHGGsjMHJ-MaCVHltDvT9PqAA~xrnd33xjv318Jsxz-xCv0b3X4kvuaNZRJRumblbyf-bNVaCDLdirvRFmJdOJ~xTRpLQ~vspIzaVpwyzn9lMcVRSdnrQgsDCA__"
      />

      {/* <Services services={data?.data?.attributes?.services} /> */}
      <Projects />
      <ClientsReviews />
      <Contact />
    </main>
  );
};

export default AboutUs;
