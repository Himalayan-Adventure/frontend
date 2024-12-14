"use client";
import Image from "next/image";
import destinationImg from "/public/images/destination.jpg";
import { m, domMax, LazyMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { APIResponseCollection } from "@/types/types";
import { de } from "date-fns/locale";
import { Text } from "../ui/text";
// const destinations = [
//   {
//     name: "Mustang Region",
//     location: "Lorem Ipsum",
//     image: destinationImg,
//   },
//   {
//     name: "ABC Trekking",
//     location: "Lorem Ipsum",
//     image: destinationImg,
//   },
//   {
//     name: "Everest Region",
//     location: "Lorem Ipsum",
//     image: destinationImg,
//   },
//   {
//     name: "Makalu Region",
//     location: "Lorem Ipsum",
//     image: destinationImg,
//   },
// ];

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
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-regions?populate=*`,
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
                Explore Stunning Destinations in Nepal: A Journey Through
                Mountains, Culture, and Serenity
              </p>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="mt-8 grid grid-cols-2 gap-2 md:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-16">
            {isPending ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : isError || destinations.data.length === 0 ? (
              <Text variant="text-md"> No package destinations found</Text>
            ) : (
              destinations?.data.map((destination, index) => {
                const image = destination.attributes.image?.data;
                return (
                  <div
                    key={index}
                    className="destination-card relative rounded-3xl border border-gray-200 bg-white"
                  >
                    <div className="absolute top-12 -z-10 w-full">
                      <div className="h-16 w-full bg-gray-700 blur-lg lg:h-36"></div>
                    </div>
                    <div className="absolute -bottom-2 -z-10 flex w-full justify-center">
                      <div className="h-12 w-12 rounded-full bg-gray-700 blur-2xl md:h-24 md:w-24"></div>
                    </div>
                    {image && (
                      <Image
                        src={image.attributes.url}
                        alt={image.attributes.url}
                        height={image.attributes.height}
                        width={image.attributes.width}
                        className="w-full rounded-t-3xl object-cover grayscale transition duration-300 lg:h-60"
                      />
                    )}
                    <div className="space-y-1 py-4 text-center lg:space-y-3">
                      <p className="text-xs text-gray-500 md:text-sm">
                        {
                          destination?.attributes?.package_country?.data
                            ?.attributes.name
                        }
                      </p>
                      <h2 className="text-sm md:text-lg lg:text-[22px]">
                        {destination.attributes.name}
                      </h2>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                        <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                        <div className="h-3 w-3 rounded border bg-gray-200 lg:h-6 lg:w-6"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
