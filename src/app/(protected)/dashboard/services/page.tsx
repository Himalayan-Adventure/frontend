import CommonBanner from "@/components/ui/common-banner";
import serviceImg from "/public/images/travel.jpeg";

import { SideFilter, TopFilter } from "@/app/(routes)/services/filters";
import { ServiceCard } from "@/app/(routes)/services/service-card";
import { getPackages } from "@/server/packages/get-packages";
import { Text } from "@/components/ui/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Suspense } from "react";
import { getServices } from "@/server/services/get-services";
export default async function ServicesPage() {
  const data = await getServices();
  const packages = await getPackages();

  return (
    <main className="space-y-4">
      <span className="flex gap-x-3 font-poppins">
        <Text variant="display-sm" bold>
          Services
        </Text>
      </span>
      <Suspense>
        <TopFilter />
      </Suspense>
      <div className="flex flex-col gap-5 md:flex-row">
        <SideFilter />
        <div className="grid w-full gap-2 sm:grid-cols-[repeat(auto-fill,minmax(20em,1fr))] md:gap-6 xl:gap-8">
          {data?.map((svc, index) => <ServiceCard data={svc} key={index} />)}
        </div>
      </div>
    </main>
  );
}
