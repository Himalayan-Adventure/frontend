import CommonBanner from "@/components/ui/common-banner";
import serviceImg from "/public/images/travel.jpeg";
import { SideFilter, TopFilter } from "./filters";

import fallbackImg from "/public/images/packageBanner.png";
import { ServiceCard } from "./service-card";
import { getPackages } from "@/server/packages/get-packages";
import Image from "next/image";
import { SortFilters } from "./sort-filters";
import { Text } from "@/components/ui/text";
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  function getServices(n: number) {
    const d = Array.from({ length: n }, (_, i) => ({
      name: "Travel and Tour " + i,
      image: serviceImg,
    }));
    return d;
  }
  const data = getServices(10);
  const packages = await getPackages();
  console.log(packages);

  return (
    <main className="container space-y-4">
      {/*<CommonBanner
        title="Services"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna "
      />
      */}

      <Image
        src={fallbackImg}
        alt="Background Image"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 h-96 w-full object-cover lg:h-auto"
      />

      <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
          Services
        </h1>
      </div>

      <div className="flex items-center justify-between">
        <TopFilter />
        <SortFilters />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <SideFilter />
        {searchParams.type === "Packages" ? (
          <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
            {data.map((svc, index) => (
              <ServiceCard data={svc} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-y-5">
            <Text variant="text-xl" bold>
              All members
            </Text>
            <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
              {data.map((svc, index) => (
                <ServiceCard data={svc} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
