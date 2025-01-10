import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import Image, { StaticImageData } from "next/image";
import { Suspense } from "react";
import { TopFilter } from "./filters";
import { ServiceContent } from "./service-content";
import { SortFilters } from "./sort-filters";
import cloudImage from "/public/images/cloud.png";
import bgImage from "/public/images/packagesBanner.png";

type TSearchParams = {
  searchParams: {
    type?: string;
    category?: string;
    name?: string;
    limit?: number;
  };
};

export const metadata: Metadata = {
  title: `Services`,
  description: ` ${siteConfig.siteName}`,
};
export default async function ServicesPage({ searchParams }: TSearchParams) {
  return (
    <main className="container space-y-4">
      <Banner title="Services" bgImage={bgImage} />

      <section className="relative z-20 space-y-2 md:top-52">
        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <Suspense>
            <TopFilter />
          </Suspense>

          <Suspense>
            <SortFilters />
          </Suspense>
        </div>
        <Suspense>
          <ServiceContent />
        </Suspense>
      </section>
    </main>
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
