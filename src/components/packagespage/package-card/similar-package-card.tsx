/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import { cn, formatDate, formatDateRange } from "@/lib/utils";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const SimilarPackageCard = ({
  pkg,
}: {
  pkg: APIResponseData<"api::package.package">;
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const attr = pkg.attributes;

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const start = attr?.adventure_specification?.travel_dates?.[0]?.date;
  const end = attr?.adventure_specification?.travel_dates?.[1]?.date;
  if (start && end) {
    const a = formatDateRange(start, end);
  }

  const toggleOverlay = () => {
    0;
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <div
      className={cn(
        "group transform cursor-pointer overflow-hidden rounded-xl transition-transform",
      )}
    >
      <div className="relative h-full">
        <div
          id={`${pkg.id}-swapper-ref`}
          className={cn(
            isOverlayVisible ? "z-auto" : "z-[52]",
            "relative h-fit",
          )}
        >
          <SliderComponent
            images={pkg?.attributes?.image}
            type="hover"
            isOverlayVisible={isOverlayVisible}
          />
        </div>
        <div className="absolute right-4 top-4 z-[52] flex h-12 w-full items-end justify-end p-2">
          <button onClick={toggleFavorite} aria-label="Favorite">
            {isFavorited ? (
              <IoHeartSharp size={24} className="text-primary" />
            ) : (
              <IoHeartOutline size={24} className="text-white" />
            )}
          </button>
        </div>

        <div className="py-2">
          <Link href={`/packages/${pkg.id}`} className="pt-4">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-sm font-semibold text-primary">
                {attr?.package_name}
              </h1>
              <div className="flex items-center text-primary">
                <FaStar />
                <p className="ml-1 text-sm">4.5</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">Beach and ocean views</p>
            <span className="flex flex-row items-center">
              {start && end && <p>{formatDateRange(start, end as string)}</p>}
              <p className="text-sm text-gray-600">· Individual Host</p>
            </span>
            <p className="mt-2 text-lg font-[900] text-primary underline">
              Rs. 40000
            </p>
          </Link>
        </div>

        {/* detail overlay  */}
      </div>
    </div>
  );
};

export default SimilarPackageCard;

export const SliderComponent = ({
  images,
  type,
  isOverlayVisible,
}: {
  images: APIResponseCollection<"plugin::upload.file"> | undefined;
  type: "hover" | "default";
  isOverlayVisible: boolean;
}) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={false}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className={cn(
        "mySwiper",
        type === "default"
          ? "absolute left-0"
          : isOverlayVisible
            ? "z-auto block"
            : "z-[52] hidden",
      )}
    >
      {images?.data?.map(
        (image, index: number) =>
          //@ts-ignore
          image?.attributes?.formats?.small && (
            <SwiperSlide key={index}>
              <Image
                //@ts-ignore
                src={image?.attributes?.formats?.small?.url}
                alt={
                  image?.attributes?.name ||
                  image?.attributes?.caption ||
                  `Slider image ${image.id}`
                }
                //@ts-ignore
                width={image?.attributes?.small?.width || 400}
                //@ts-ignore
                height={image?.attributes?.small?.height || 400}
                className="h-96 w-full rounded rounded-es-3xl rounded-se-3xl object-cover"
              />
            </SwiperSlide>
          ),
      )}
    </Swiper>
  );
};
