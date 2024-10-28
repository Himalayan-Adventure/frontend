/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsBarChartFill, BsCloudHail } from "react-icons/bs";
import {
  FaCanadianMapleLeaf,
  FaMountain,
  FaRegSnowflake,
  FaRegSun,
  FaStar,
} from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { LuStar } from "react-icons/lu";
import { MdTimelapse } from "react-icons/md";
import wordsToNumbers from "words-to-numbers";

import { cn, formatDate } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "../ui/button";
import { seasonIconMap, seasonMonthMap } from "@/config/ui-constants";
import { TDepartureData } from "@/types/packages/departure";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PackageCard = ({
  pkg,
  variant = "default",
}: {
  pkg: APIResponseData<"api::package.package">;

  variant?: "home" | "default" | "similar";
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const attr = pkg.attributes;

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const toggleOverlay = () => {
    0;
    setIsOverlayVisible(!isOverlayVisible);
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardState, setCardState] = useState(0);
  useEffect(() => {
    const handleMouseLeave = () => {
      setIsOverlayVisible(false);
    };
    if (cardRef?.current) {
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
    return () =>
      cardRef?.current?.removeEventListener("mouseleave", handleMouseLeave);
  });
  return (
    <div
      ref={cardRef}
      className={cn(
        variant == "default" ? "bg-white shadow-xl shadow-gray-500" : "",
        "group transform cursor-pointer overflow-hidden rounded-xl transition-transform",
      )}
    >
      <div className="absolute left-0 top-1/2 -z-[51] flex w-full -translate-y-1/2 justify-between opacity-0 transition-all ease-in-out group-hover:z-[51] group-hover:opacity-100">
        <Button
          className="w-fit rounded-none px-1"
          disabled={cardState === 0}
          onClick={() => {
            if (cardState > 0) {
              setCardState(cardState - 1);
            }
          }}
        >
          <ChevronLeft size={14} />
        </Button>

        <Button
          disabled={cardState === 1}
          className="w-fit rounded-none px-1"
          onClick={() => {
            if (cardState < 1) {
              setCardState(cardState + 1);
            }
          }}
        >
          <ChevronRight size={14} />
        </Button>
      </div>
      <div className="relative h-full p-4">
        <SliderComponent pkg={pkg} type="hover" />
        {cardState === 0 && <Overlay pkg={pkg} />}
        {/* // ) : (
        //   <Overlay pkg={pkg} />
        // )} */}
        <div className="absolute top-0 z-10 flex h-12 w-full items-end justify-end p-2">
          <button onClick={toggleFavorite} aria-label="Favorite">
            {isFavorited ? (
              <IoHeartSharp size={24} className="text-primary" />
            ) : (
              <IoHeartOutline size={24} className="text-white" />
            )}
          </button>
        </div>

        <div className="py-2">
          {variant !== "similar" ? (
            <>
              <div className="flex w-full justify-end">
                <p className="flex items-center space-x-1 text-sm">
                  <FaStar className="text-primary" /> <span>5</span>
                </p>
              </div>
              <div>
                <Link href={`/packages/${pkg.id}`}>
                  <p className="text-lg font-medium text-primary">
                    {attr?.package_name}
                  </p>

                  {attr?.sponsor_host?.host_name && (
                    <p className="mb-2 text-sm font-light md:text-[16px]">
                      Host: {attr?.sponsor_host?.host_name}
                    </p>
                  )}
                </Link>
                <Button
                  variant="ghost"
                  className="h-fit p-0 font-[900] text-primary hover:bg-transparent hover:text-primary/70"
                  onClick={toggleOverlay}
                >
                  Get Quote
                </Button>
              </div>
            </>
          ) : (
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
              <p className="text-sm text-gray-600">
                6 - 21 Sep. · Individual Host
              </p>

              <p className="mt-2 text-lg font-[900] text-primary underline">
                Rs. 40000
              </p>
            </Link>
          )}
        </div>

        {/* detail overlay  */}
      </div>
    </div>
  );
};

export default PackageCard;

const Overlay = ({ pkg }: { pkg: APIResponseData<"api::package.package"> }) => {
  const attr = pkg.attributes;
  return (
    <div
      className={cn(
        // isOverlayVisible ? "opacity-1 z-50" : "-z-50 opacity-0",
        "absolute inset-0 -z-50 mx-auto flex w-[calc(100%-40px)] flex-col justify-between overflow-auto bg-black bg-opacity-70 p-4 text-white opacity-0 transition-all ease-in-out group-hover:z-50 group-hover:opacity-100",
      )}
    >
      <div className="absolute right-0 top-0 hidden -translate-y-1/2 translate-x-1/2 justify-end bg-black/40">
        <button
          // onClick={toggleOverlay}
          className="text-white hover:text-gray-400"
        >
          <AiOutlineClose size={16} />
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Departure</p>
          <p className="flex items-center space-x-1 text-sm">
            <span>
              <LuStar className="text-primary" />
            </span>
            <span>{Math.floor(Math.random() * 5)}</span>
            <span className="text-xl text-gray-400">·&nbsp;</span>
            <a href="#" className="underline">
              {Math.floor(Math.random() * 100)} reviews
            </a>
          </p>
        </div>
        <div className="my-2 rounded border bg-white p-2">
          {attr?.adventure_specification?.travel_dates?.map((i, index) => (
            <div
              className="mt-2 flex items-center justify-between"
              key={`departure-${attr.package_name}-${pkg.id}${index}`}
            >
              <div className="">
                <p className="text-xs text-black">Date</p>
                <p className="text-xs text-gray-500" key={`departure-${index}`}>
                  {formatDate(i?.date as string)} -{" "}
                  {formatDate(i?.date as string)}
                </p>
              </div>

              <Button className="rounded-full bg-black px-4 py-1 text-xs text-white">
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full rounded bg-primary py-2 font-semibold text-white hover:bg-orange-500">
          Get Quote
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <p className="mb-4 text-center text-sm">You won’t be charged yet</p>
        <p className="flex items-center space-x-2 text-sm font-medium">
          {
            seasonIconMap?.[
              (attr?.adventure_specification?.season?.toString() as string) ||
                "winter"
            ]
          }
          <span className="capitalize">
            {attr?.adventure_specification?.season?.toString()}: (
            {
              seasonMonthMap[
                (attr?.adventure_specification?.season?.toString() as string) ||
                  "winter"
              ]
            }
            )
          </span>
        </p>
        {attr?.adventure_specification?.duration && (
          <p className="flex items-center space-x-2 text-sm font-medium">
            <MdTimelapse size={20} />
            <span>Duration: {attr?.adventure_specification?.duration}</span>
          </p>
        )}
        <p className="flex items-center space-x-2 text-sm font-medium">
          <BsBarChartFill size={20} />
          <span>
            Grade: {attr?.adventure_specification?.grade?.[0]?.name || "-"}
          </span>
        </p>
        {attr?.adventure_specification?.max_altitude && (
          <p className="flex items-center space-x-2 text-sm font-medium">
            <FaMountain size={20} />
            <span>
              Max Altitude:{" "}
              {wordsToNumbers(attr?.adventure_specification?.max_altitude)}
            </span>
          </p>
        )}
      </div>

      <hr className="mx-auto mt-2 w-[90%]" />

      <div className="flex w-full justify-center">
        <Link
          href={`packages/${pkg?.id}`}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export const SliderComponent = ({
  pkg,
  type,
}: {
  pkg: APIResponseData<"api::package.package">;
  type: "hover" | "default";
}) => {
  const attr = pkg?.attributes;
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
        type === "default" ? "absolute left-0" : "hidden group-hover:block",
      )}
    >
      {/*@ts-ignore*/}
      {attr?.image?.data?.map((image: any, index: number) => (
        <SwiperSlide key={index}>
          <img
            src={image.attributes.url}
            alt={image.attributes.name}
            className="h-96 w-full rounded rounded-es-3xl rounded-se-3xl object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
