import bgImage from "/public/images/packagesBanner.png";
import { Suspense } from "react";
import Image, { StaticImageData } from "next/image";
import cloudImage from "/public/images/cloud.png";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { getPackages } from "@/server/packages/get-packages";
import { PackageFilter } from "../packages/filter";
import { PackageCardSkeleton } from "@/components/packagespage/package-card-skeleton";
import PackageCard from "@/components/packagespage/package-card/index";
import { getProjects } from "@/server/projects/get-projects";
import ProjectCard from "./project-card";

export const metadata: Metadata = {
  title: `Packages | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function Packages({
  searchParams,
}: {
  searchParams: { key?: string; filter?: string; operator?: string };
}) {
  const data = await getProjects({});
  console.log(data);
  return (
    <section>
      <Banner title="Projects" desc="lorem" bgImage={bgImage} />
      <div className="container relative lg:mt-40">
        <Suspense>
          <PackageFilter />
        </Suspense>
        <Suspense fallback={<PackageCardSkeleton />}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {!data || data?.data?.length === 0 ? (
              <span>No projects are available</span>
            ) : (
              data?.data?.map(
                (project, index) =>
                  project.attributes.package && (
                    <Suspense key={index}>
                      <ProjectCard key={index} project={project} />
                    </Suspense>
                  ),
              )
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
}
const Banner = ({
  title,
  bgImage,
  desc,
}: {
  title: string;
  bgImage: string | StaticImageData;
  desc?: string;
}) => {
  return (
    <>
      <div className="absolute inset-0 h-[40vh] w-full lg:h-[80vh]">
        <Image
          src={bgImage}
          alt="Background Image"
          objectFit="cover"
          quality={100}
          className="inset-0 h-full object-cover"
        />

        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="sm:mix-blend-light absolute -bottom-[45%] h-1/2 w-full object-cover md:-bottom-0 md:h-[40vh] lg:bottom-0 lg:h-auto lg:object-contain"
        />
        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="sm:mix-blend-light absolute -bottom-[45%] h-1/2 w-full object-cover mix-blend-multiply md:bottom-0 md:h-[40vh]"
        />
      </div>
      <div className="relative">
        <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
            {title}
          </h1>
          {desc && <p className="max-w-xl text-sm md:text-[16px]">{desc}</p>}
        </div>
      </div>
    </>
  );
};