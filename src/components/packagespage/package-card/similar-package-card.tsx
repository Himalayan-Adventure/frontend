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
import { truncate } from "@/lib/utils";

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

            <p className="line-clamp-2 break-all text-sm text-gray-600">
              {pkg?.attributes?.brief_description}
            </p>
            <span className="flex flex-row items-center">
              {start && end && (
                <p>{formatDateRange(start, end as string)} ·&nbsp;</p>
              )}
              <p className="text-sm text-gray-600"> Individual Host</p>
            </span>
            <p className="mt-2 text-lg font-[900] text-primary underline">
              {priceRangeFormatter(
                attr?.cost_and_budgeting?.[0]?.lowest,
                attr?.cost_and_budgeting?.[0]?.highest,
              )}
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
      {images?.data?.map((image, index: number) => {
        //prettier-ignore
        //@ts-ignore
        const smallImage =   image?.attributes?.formats?.small;
        const fallbackImg = image?.attributes;
        const optImg = smallImage || fallbackImg;
        return (
          optImg?.url && (
            <SwiperSlide
              key={`${index}-${image.id}`}
              className="group h-full w-full overflow-hidden rounded rounded-es-3xl rounded-se-3xl"
            >
              <Image
                src={optImg.url}
                alt={optImg?.name || `Slider image ${image.id}`}
                width={optImg?.width || 400}
                height={optImg?.height || 400}
                className="h-96 w-full rounded rounded-es-3xl rounded-se-3xl object-cover transition-transform duration-2000 ease-linear group-hover:scale-110 group-hover:rounded-es-3xl"
              />
            </SwiperSlide>
          )
        );
      })}
    </Swiper>
  );
};
const priceRangeFormatter = (
  lowest?: number | string,
  highest?: number | string,
) => {
  if (lowest && highest) {
    return `Rs. ${lowest}-${highest}`;
  } else {
    if (lowest) {
      return `Rs. ${lowest}`;
    } else if (highest) {
      return `Rs. ${lowest}`;
    } else {
      return "Price not available";
    }
  }
};
