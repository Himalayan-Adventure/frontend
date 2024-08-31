"use client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { APIResponseCollection } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { m, domMax, LazyMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import PackageCard from "../packagespage/package-card";

export default function HomeCarousel() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { data, isFetching, status, error } = useQuery<
    APIResponseCollection<"api::packages.packages">
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
  const toggleFavorite = (index: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(index)
        ? prevFavorites.filter((favIndex) => favIndex !== index)
        : [...prevFavorites, index],
    );
  };

  const cardsData = [
    {
      title: "Everest Expedition, Nepal",
      host: "Pioneer Adventure",
      rating: 5.0,
      image: "/images/carouselA.png",
    },

    {
      title: "Everest Expedition, Nepal",
      host: "Pioneer Adventure",
      rating: 5.0,
      image: "/images/carouselA.png",
    },
    {
      title: "Everest Expedition, Nepal",
      host: "Pioneer Adventure",
      rating: 5.0,
      image: "/images/carouselA.png",
    },
    {
      title: "Everest Expedition, Nepal",
      host: "Pioneer Adventure",
      rating: 5.0,
      image: "/images/carouselA.png",
    },
    {
      title: "Everest Expedition, Nepal",
      host: "Pioneer Adventure",
      rating: 5.0,
      image: "/images/carouselA.png",
    },
  ];

  if (status === "pending") {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    return <></>;
  }

  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5 }}
        className="container flex justify-center py-8 lg:py-16"
      >
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {data?.data.map((pkg, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <PackageCard pkg={pkg} variant="home" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </m.section>
    </LazyMotion>
  );
}
