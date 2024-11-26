"use client";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { APIResponseCollection } from "@/types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PackageCard from "./package-card";
import { PackageCardSkeleton } from "./package-card-skeleton";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
export default function PackagesList({
  data,
}: {
  data: APIResponseCollection<"api::package.package">;
}) {
  const pathname = usePathname();
  // for handling navlinks overflow in mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const overflowDir = useOverflowDetection(containerRef);
  const [curScrollX, setCurScrollX] = useState(0);
  useEffect(() => {
    const scrollFn = (e: Event) => {
      setCurScrollX(containerRef?.current?.scrollLeft || 0);
    };
    containerRef?.current?.addEventListener("scroll", scrollFn);
    return () => containerRef?.current?.removeEventListener("scroll", scrollFn);
  }, []);
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    key: string;
    operator: string;
  }>({
    name: searchParams.get("key") || "All",
    key: searchParams.get("filter") || "none",
    operator: searchParams.get("operator") || "$eqi",
  });
  // const { data, isFetching, isRefetching, status, error } = useQuery<
  //   APIResponseCollection<"api::package.package">
  // >({
  //   queryKey: [
  //     "packages",
  //     selectedCategory,
  //     searchParams.get("filter"),
  //     searchParams.get("key"),
  //   ],
  //   queryFn: async () => {
  //     try {
  //       const params = new URLSearchParams();
  //       params.set("populate", "*");
  //       const filter = searchParams.get("filter");
  //       const key = searchParams.get("key");
  //       if (filter && key && selectedCategory.name !== "All") {
  //         if (key === "altitude") {
  //           const filterName = `filters[${key}][$gte]`;
  //           params.set(filterName, filter);
  //         } else {
  //           const filterName = `filters[${key}]`;
  //           params.set(filterName, filter);
  //         }
  //       }
  //
  //       const data = await axios.get(
  //         `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?${params.toString()}`,
  //       );
  //       return data.data;
  //     } catch (error) {
  //       console.error("Error fetching", error);
  //     }
  //   },
  //   placeholderData: keepPreviousData,
  // });
  //
  // const [filters, setFilters] = useState();
  // const [filteredPackages, setFilteredPackages] = useState<
  //   APIResponseCollection<"api::package.package"> | null | undefined
  // >(null);
  //
  // useEffect(() => {
  //   if (data) {
  //     setFilteredPackages(data);
  //   }
  // }, [data]);

  return (
    <section className="container relative lg:mt-40">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {!data ? (
          <div className="w-full md:col-span-2 lg:col-span-4">
            <PackageCardSkeleton />
          </div>
        ) : data?.data?.length === 0 ? (
          <span>No packages are available</span>
        ) : (
          data?.data?.map((pkg, index) => <PackageCard key={index} pkg={pkg} />)
        )}
      </div>
    </section>
  );
}
