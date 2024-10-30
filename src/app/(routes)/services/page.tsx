import CommonBanner from "@/components/ui/common-banner";
import serviceImg from "/public/images/travel.jpeg";

import { SideFilter, TopFilter } from "./filters";
import { ServiceCard } from "./service-card";
import { getPackages } from "@/server/packages/get-packages";
export default async function ServicesPage() {
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
      <CommonBanner
        title="Services"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna "
      />

      <TopFilter />
      <div className="flex flex-col gap-5 md:flex-row">
        <SideFilter />
        <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
          {data.map((svc, index) => (
            <ServiceCard data={svc} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
