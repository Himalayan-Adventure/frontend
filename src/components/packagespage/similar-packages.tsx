"use client";
/* eslint-disable @next/next/no-img-element */
import { FaHeart, FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { APIResponseCollection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PackageCardSkeleton } from "./package-card-skeleton";
import { Text } from "../ui/text";
import PackageCard from "./package-card";

const packages = [
  {
    id: 1,
    name: "Half Moon Bay, California, US",
    views: "Beach and ocean views",
    date: "22–27 Oct · Individual Host",
    price: "Rs.2000",
    rating: 5.0,
    imageUrl: "/images/experts.jpeg",
    images: [
      {
        name: "image 1",
        url: "https://img.freepik.com/free-photo/aerial-vertical-shot-annapurna-himalayas-nepal_181624-47860.jpg?t=st=1725380246~exp=1725383846~hmac=8a02ede5653680ea71c38d86207fd3100e69491b09f7c046ad3dd62d0a2c736f&w=996",
      },
      {
        name: "image 2",
        url: "https://img.freepik.com/free-photo/archeology-dig-site-with-ancient-remains-discoveries_23-2151786826.jpg?t=st=1725380268~exp=1725383868~hmac=f625627f7ba494a67c4dd51ed0a2be986f15522cce2eed51128ca01dd0363be2&w=740",
      },
    ],
  },
  {
    id: 2,
    name: "Half Moon Bay, California, US",
    views: "Beach and ocean views",
    date: "22–27 Oct · Individual Host",
    price: "Rs.2000",
    rating: 5.0,
    imageUrl: "/images/experts.jpeg",
    images: [
      {
        name: "image 1",
        url: "https://img.freepik.com/free-photo/aerial-vertical-shot-annapurna-himalayas-nepal_181624-47860.jpg?t=st=1725380246~exp=1725383846~hmac=8a02ede5653680ea71c38d86207fd3100e69491b09f7c046ad3dd62d0a2c736f&w=996",
      },
      {
        name: "image 2",
        url: "https://img.freepik.com/free-photo/archeology-dig-site-with-ancient-remains-discoveries_23-2151786826.jpg?t=st=1725380268~exp=1725383868~hmac=f625627f7ba494a67c4dd51ed0a2be986f15522cce2eed51128ca01dd0363be2&w=740",
      },
    ],
  },
];

const SimilarPackages = () => {
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::package.package">
  >({
    queryKey: ["packages"],
    queryFn: async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?populate=*`,
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
    return <></>;
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
            <span>No packages are available</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimilarPackages;
