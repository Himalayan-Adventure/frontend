import ClientsReviews from "@/components/about/clients-reivews";
import Contact from "@/components/about/contact";
import Introduction from "@/components/about/introduction";
import Projects from "@/components/about/projects";
import { BlackLogo } from "@/components/logo";
import CommonBanner from "@/components/ui/common-banner";
import { getAboutUs } from "@/server/about-us/get-aboutUs";
import bgImage from "/public/images/packagesBanner.png";
import Services from "@/components/about/services";
import { getProjects } from "@/server/projects/get-projects";

const AboutUs = async () => {
  const data = await getAboutUs();
  const projectsData = await getProjects({});

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
      {projectsData && <Projects projectsData={projectsData?.data} />}
      <ClientsReviews />
      <Contact />
    </main>
  );
};

export default AboutUs;
