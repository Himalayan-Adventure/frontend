import ClientsReviews from "@/components/about/clients-reivews";
import Contact from "@/components/about/contact";
import Introduction from "@/components/about/introduction";
import Projects from "@/components/about/projects";
import { BlackLogo } from "@/components/logo";
import CommonBanner from "@/components/ui/common-banner";
import { getAboutUs } from "@/server/about-us/get-aboutUs";
import bgImage from "/public/images/packagesBanner.png";
import Services from "@/components/about/services";

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
        image={data?.data?.attributes?.image?.data?.[0]?.attributes?.url}
      />

      <Services services={data?.data?.attributes?.service} />
      <Projects projectsData={projects} />
      <ClientsReviews />
      <Contact />
    </main>
  );
};

export default AboutUs;

const projects = [
  {
    title: "Everest Base Camp Trek",
    date: "2023-06-15",
    description:
      "Experience the thrill of trekking to the base camp of the world's highest mountain, enjoying breathtaking views and unique cultural encounters.",
    imageUrl: "/images/experts.jpeg",
  },
  {
    title: "Annapurna Circuit Trek",
    date: "2023-05-10",
    description:
      "Embark on one of the most popular treks in Nepal, offering stunning mountain vistas and a diverse cultural experience.",
    imageUrl: "/images/experts.jpeg",
  },
  {
    title: "Langtang Valley Trek",
    date: "2023-07-20",
    description:
      "Discover the serenity of Langtang Valley with its pristine landscapes, majestic peaks, and rich heritage.",
    imageUrl: "/images/experts.jpeg",
  },
];
