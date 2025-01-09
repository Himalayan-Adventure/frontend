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
        {/* <div className="flex w-full flex-col gap-5 md:flex-row">
          {searchParams.type === "packages" && <SideFilter />}
          {searchParams.type === "packages" ? (
            <Suspense fallback={<Loading className="h-48" />}>
              <ServicesPackages searchParams={searchParams} />
            </Suspense>
          ) : (
            <Suspense fallback={<Loading className="h-48" />}>
              <ServicesGuides searchParams={searchParams} />
            </Suspense>
          )}
        </div> */}
      </section>
    </main>
  );
}
// async function ServicesPackages({ searchParams }: TSearchParams) {
//   const { category } = searchParams;
//   const data = await getServices(searchParams);
//   const user = await getCurrentUserData();
//   return (
//     <div className="z-10 w-full space-y-10 py-10">
//       <Text variant="text-xl" bold>
//         Services
//       </Text>
//       <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
//         {data?.data?.map((svc, index) => (
//           <ServiceCard data={svc} key={index} userId={user?.id} />
//         ))}
//       </div>
//       {data && data?.meta.pagination.total > 10 && (
//         <ServicesPagination
//           title="Continue exploring amazing views"
//           disabled={data.meta.pagination.total <= data.meta.pagination.pageSize}
//         />
//       )}
//     </div>
//   );
// }
// async function ServicesGuides({ searchParams }: TSearchParams) {
//   const data = await getUsers(
//     "merchant",
//     searchParams.name,
//     searchParams.limit || 20,
//   );

//   return (
//     <div className="relative flex w-full flex-col gap-y-5 py-10 md:pl-36">
//       <Text variant="text-xl" bold>
//         All members
//       </Text>

//       <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
//         {data?.map((guide, index) => (
//           <GuideCard guide={guide} key={`guide-${index}`} />
//         ))}
//       </div>
//       {data && data?.length > 20 && <ServicesPagination />}
//     </div>
//   );
// }

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
