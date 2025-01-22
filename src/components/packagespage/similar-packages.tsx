"use client";
/* eslint-disable @next/next/no-img-element */

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { APIResponseCollection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PackageCardSkeleton } from "./package-card-skeleton";
import PackageCard from "./package-card";
import { Text } from "../ui/text";

const SimilarPackages = ({ notToInclude }: { notToInclude?: number }) => {
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::package.package">
  >({
    queryKey: ["packages"],
    queryFn: async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?fields[0]=package_name&populate[image][populate]0]=image&fields[2]=parent_title&fields[3]=brief_description&populate[adventure_specification][populate][1]=travel_dates&populate[package_host][populate][3]=package_host&populate[cost_and_budgeting][populate]=*&filters[id][$ne]=${notToInclude}&pagination[pageSize]=4&pagination[page]=1`,
        );
        return data.data;
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
  });
  if (isFetching) {
    return <PackageCardSkeleton />;
  }
  if (error) {
    return (
      <section className="container py-4 lg:py-8">
        <div>
          <h2 className="mb-6 text-lg font-semibold md:text-xl lg:text-2xl">
            Similar Packages
          </h2>
          <Text variant="text-lg" bold className="w-full text-center">
            No similar packages found
          </Text>
        </div>
      </section>
    );
  }
  return (
    <section className="container py-4 lg:py-8">
      <div>
        <h2 className="mb-6 text-lg font-semibold md:text-xl lg:text-2xl">
          Similar Packages
        </h2>
        <div className="grid w-full gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {data?.data && data.data.length > 0 ? (
            data.data
              ?.slice(0, 4)
              ?.map((pkg, index) => (
                <PackageCard key={index} pkg={pkg} variant="similar" />
              ))
          ) : (
            <span>No similar packages are available</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimilarPackages;
