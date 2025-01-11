import { Suspense } from "react";
import { getPackages } from "@/server/packages/get-packages";
import { PackageFilter } from "./filter";
import { PackageCardSkeleton } from "@/components/packagespage/package-card-skeleton";
import PackageCard from "@/components/packagespage/package-card/index";
import SearchBar from "@/components/ui/search-bar";
import { LoadMorePagination } from "@/components/services/pagination";
import { SearchX } from "lucide-react";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { Banner } from "@/components/ui/banner";
export const metadata: Metadata = {
  title: `Packages | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function Packages({
  searchParams,
}: {
  searchParams: {
    key?: string;
    filter?: string;
    operator?: string;
    title?: string;
    limit?: number;
  };
}) {
  const { title } = searchParams;
  const data = await getPackages(searchParams);
  return (
    <section>
      <Banner title={"Packages"} desc="" />
      <div className="container relative gap-y-2 lg:mt-40">
        <div className="flex justify-end [&>div]:w-fit">
          <SearchBar
            selector="title"
            className="max-w-48 justify-end rounded-lg placeholder:text-sm"
          />
        </div>
        <PackageFilter />
        <Suspense fallback={<PackageCardSkeleton />}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(0,300px))] gap-4">
            {!data || data?.data.length === 0 ? (
              <span className="col-span-full flex flex-col items-center gap-y-4 text-center text-lg">
                <SearchX size={32} className="text-gray-600" />
                No packages are available {title && `for search "${title}"`} !
              </span>
            ) : (
              data?.data?.map((pkg, index) => (
                <Suspense key={index}>
                  <PackageCard variant="default" key={index} pkg={pkg} />
                </Suspense>
              ))
            )}
          </div>
        </Suspense>
        <LoadMorePagination
          className="mt-40"
          disabled={!data || data?.meta?.pagination.total < 8}
        />
      </div>
    </section>
  );
}
