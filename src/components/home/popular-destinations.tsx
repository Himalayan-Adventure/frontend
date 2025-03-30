"use client";
import Image from "next/image";
import { m, domMax, LazyMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { APIResponseCollection } from "@/types/types";
import Link from "next/link";
import { Text } from "../ui/text";
import { ImageIcon } from "lucide-react";

export default function PopularDestinations() {
  const {
    data: destinations,
    isPending,
    isError,
  } = useQuery<APIResponseCollection<"api::package-region.package-region">>({
    queryKey: ["package-region"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-regions?filters[is_popular]=true&fields[0]=name&populate[0]=image&populate[1]=package_country`,
        );
        if (!res.ok) {
          throw new Error("Error fetching package region");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pb-8 lg:pb-16"
      >
        <div className="container">
          {/* Heading */}
          <div className="flex lg:justify-center lg:text-center">
            <div className="lg:max-w-2xl">
              <h1 className="comp-heading">Popular Destinations</h1>
              <p className="comp-subheading mt-2 lg:mt-4">
                Discover Breathtaking Getaways Worldwide: Uniting Nature,
                Culture, and Adventure for Your Ultimate Escape!
              </p>
            </div>
          </div>

          {/* Destinations Layout*/}
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-2 md:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-16">
            {isPending ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : isError || destinations.data.length === 0 ? (
              <Text variant="text-lg" className="col-span-4 text-center">
                No popular package destinations found!
              </Text>
            ) : (
              destinations?.data.map((destination, index) => {
                //prettier-ignore
                //@ts-ignore
                const smallImage =   destination.attributes.image?.data?.attributes?.formats?.small;
                const fallbackImg =
                  destination?.attributes?.image?.data?.attributes;
                const image = smallImage || fallbackImg;

                return (
                  <Link
                    href={`/packages?key=region&filter=${destination.id}`}
                    key={index}
                    className="destination-card relative grid aspect-square min-w-[200px] grid-rows-[60%_120px] gap-y-2 rounded-3xl border border-gray-200 bg-white"
                  >
                    <div className="absolute top-12 -z-10 w-full">
                      <div className="h-16 w-full bg-gray-700 blur-lg lg:h-36"></div>
                    </div>
                    <div className="absolute -bottom-2 -z-10 flex w-full justify-center">
                      <div className="h-12 w-12 rounded-full bg-gray-700 blur-2xl md:h-24 md:w-24"></div>
                    </div>
                    {image ? (
                      <Image
                        src={image?.url}
                        alt={image?.name}
                        height={image?.height}
                        width={image?.width}
                        className="h-full max-h-60 w-full rounded-t-3xl object-cover grayscale transition duration-300 lg:h-60"
                      />
                    ) : (
                      <div className="grid h-full max-h-60 w-full place-items-center rounded-t-3xl bg-gray-100 md:min-w-72">
                        <ImageIcon
                          size={16}
                          className="size-16 text-gray-400"
                        />
                      </div>
                    )}
                    <div className="space-y-1 px-4 py-4 text-center lg:space-y-2">
                      <p className="line-clamp-1 text-xs text-gray-500 md:text-sm">
                        {
                          destination?.attributes?.package_country?.data
                            ?.attributes.name
                        }
                      </p>
                      <h2 className="line-clamp-1 text-sm md:text-lg lg:text-[22px]">
                        {destination.attributes.name}
                      </h2>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                        <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                        <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
