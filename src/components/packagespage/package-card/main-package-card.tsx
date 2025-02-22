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

import { cn } from "@/lib/utils";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Overlay } from "./overlay";
import { format } from "date-fns";

const MainPackageCard = ({
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
  const departureData = {
    start: attr?.adventure_specification?.travel_dates?.[0]?.date || new Date(),
    end: attr?.adventure_specification?.travel_dates?.[1]?.date || new Date(),
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardState, setCardState] = useState(0);
  useEffect(() => {
    const container = containerRef?.current;

    const handleMouseLeaveContainer = (e: MouseEvent) => {
      setIsOverlayVisible(false);
    };
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        overlayRef.current.contains(e.relatedTarget as Node)
      ) {
        return;
      }
      if ((e.relatedTarget as HTMLElement).id === `swiper-button-${pkg.id}`) {
        return;
      }

      setIsOverlayVisible(false);
    };
    const handleMouseEnter = () => {
      setIsOverlayVisible(true);
    };
    if (overlayRef?.current) {
      overlayRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
    if (cardRef?.current) {
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
    }
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeaveContainer);
    }
    return () => {
      overlayRef?.current?.removeEventListener("mouseleave", handleMouseLeave);
      cardRef?.current?.removeEventListener("mouseenter", handleMouseEnter);
      containerRef?.current?.addEventListener(
        "mouseleave",
        handleMouseLeaveContainer,
      );
    };
  });
  return (
    <div
      ref={containerRef}
      className={cn(
        variant == "default" ? "bg-white shadow-xl shadow-gray-500" : "",
        "group transform cursor-pointer overflow-hidden rounded-xl transition-transform",
      )}
    >
      <div
        id={`swiper-button-${pkg.id}`}
        className={cn(
          "absolute left-0 top-1/2 z-[51] flex w-full -translate-y-1/2 justify-between transition-all ease-in-out",
        )}
      >
        <Button
          className="relative -z-[51] w-fit rounded-none px-1 opacity-0 disabled:opacity-0 group-hover:z-[51] group-hover:opacity-100 group-hover:disabled:opacity-50"
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
          className="relative -z-[51] w-fit rounded-none px-1 opacity-0 disabled:opacity-0 group-hover:z-[51] group-hover:opacity-100 group-hover:disabled:opacity-50"
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
        <div
          id={`${pkg.id}-swapper-ref`}
          className={cn(
            isOverlayVisible ? "z-auto" : "z-[52]",
            "relative h-fit",
          )}
          ref={cardRef}
        >
          <SliderComponent
            images={pkg?.attributes?.image}
            type="hover"
            isOverlayVisible={isOverlayVisible}
          />
        </div>
        {cardState === 0 && (
          <Overlay
            ref={overlayRef}
            pkg={pkg}
            isOverlayVisible={isOverlayVisible}
            className="!top-1/2 h-[calc(100%-30px)] w-[calc(100%-30px)] -translate-y-1/2"
          />
        )}
        {cardState === 1 && (
          <div className="absolute right-4 top-4 z-[52] flex h-12 w-full items-end justify-end p-2">
            <button onClick={toggleFavorite} aria-label="Favorite">
              {isFavorited ? (
                <IoHeartSharp size={24} className="text-primary" />
              ) : (
                <IoHeartOutline size={24} className="text-primary" />
              )}
            </button>
          </div>
        )}

        <div className="py-2">
          {variant !== "similar" ? (
            <>
              <div className="flex w-full justify-end">
                <p className="flex items-center space-x-1 text-sm">
                  <FaStar className="text-primary" /> <span>5</span>
                </p>
              </div>
              <div>
                <Link prefetch={true} href={`/packages/${pkg.id}`}>
                  <p className="text-lg font-medium text-primary">
                    {attr?.package_name}
                  </p>

                  {attr?.package_host?.hostname && (
                    <p className="mb-2 text-sm font-light md:text-[16px]">
                      Host: {attr?.package_host?.hostname}
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

              {attr.brief_description && (
                <p className="text-sm text-gray-600">
                  {attr?.brief_description}
                </p>
              )}
              {departureData.start && departureData.end && (
                <p className="text-sm text-gray-600">
                  {format(departureData.start, "dd")}-
                  {format(departureData.end, "dd MMM")}6 - 21 Sep. · Individual
                  Host
                </p>
              )}
              {attr?.cost_and_budgeting?.[0] && (
                <p className="mt-2 text-lg font-[900] text-primary underline">
                  Rs.{attr.cost_and_budgeting?.[0]?.lowest}-
                  {attr.cost_and_budgeting?.[0]?.highest}
                </p>
              )}
            </Link>
          )}
        </div>

        {/* detail overlay  */}
      </div>
    </div>
  );
};

export default MainPackageCard;

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
