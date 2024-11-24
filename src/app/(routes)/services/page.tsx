import CommonBanner from "@/components/ui/common-banner";
import serviceImg from "/public/images/travel.jpeg";
import { SideFilter, TopFilter } from "./filters";

import fallbackImg from "/public/images/packageBanner.png";
import { ServiceCard } from "./service-card";
import { getPackages } from "@/server/packages/get-packages";
import Image from "next/image";
import { SortFilters } from "./sort-filters";
import { Text } from "@/components/ui/text";
import { getServices } from "@/server/services/get-services";
import { getUsers, getUsersDeep } from "@/server/users/get-users";
import { ServicesPagination } from "@/components/services/pagination";
import { APIResponseCollection } from "@/types/types";
import { GuideCard } from "@/components/profile/guide-card";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
type TSearchParams = {
  searchParams: { type?: string; category?: string; name?: string };
};

export const metadata: Metadata = {
  title: `Services | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function ServicesPage({ searchParams }: TSearchParams) {
  return (
    <main className="container space-y-4">
      <Image
        src={fallbackImg}
        alt="Background Image"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 -z-10 h-64 w-full object-cover lg:h-auto"
      />

      <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
          Services
        </h1>

        <p className="max-w-xl text-sm md:text-[16px]">
          In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Etiam
          ultricies nisi vel augue. Suspendisse eu ligula. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </div>

      <section className="relative z-20 md:top-52">
        <div className="relative flex items-center justify-between">
          <TopFilter />
          <SortFilters />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <SideFilter />
          {searchParams.type === "Packages" ? (
            <ServicesPackages searchParams={searchParams} />
          ) : (
            <ServicesGuides />
          )}
        </div>
      </section>
    </main>
  );
}
async function ServicesPackages({ searchParams }: TSearchParams) {
  const { category } = searchParams;
  const data = await getServices(searchParams);
  return (
    <div className="z-10 w-full space-y-10 py-10">
      <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
        {data?.data?.map((svc, index) => (
          <ServiceCard data={svc} key={index} />
        ))}
      </div>
      <ServicesPagination />
    </div>
  );
}
async function ServicesGuides() {
  const data = await getUsersDeep("merchant");

  return (
    <div className="flex flex-col gap-y-5 py-10">
      <Text variant="text-xl" bold>
        All members
      </Text>

      <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
        {data?.map((user, index) => (
          <GuideCard user={user} key={`guide-${index}`} />
        ))}
      </div>
      <ServicesPagination />
    </div>
  );
}
