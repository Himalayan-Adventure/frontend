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

const HomePackageCard = ({
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

  const toggleOverlay = () => {
    0;
    setIsOverlayVisible(!isOverlayVisible);
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
        "group transform cursor-pointer select-none overflow-hidden rounded-xl transition-transform",
      )}
    >
      <div className="relative">
        <div
          id={`${pkg.id}-swapper-ref`}
          className={cn(
            isOverlayVisible ? "z-auto" : "z-[52]",
            "relative h-fit",
          )}
          ref={cardRef}
        >
          <div
            id={`swiper-button-${pkg.id}`}
            className={cn(
              "absolute left-0 top-1/2 z-[51] flex w-full -translate-y-1/2 justify-between transition-all ease-in-out",
            )}
          >
            <Button
              name="carousel-left"
              className="relative -z-[51] w-fit rounded-none px-1 opacity-0 disabled:opacity-0 group-hover:z-[51] group-hover:opacity-100 group-hover:disabled:opacity-50"
              disabled={cardState === 0}
              onClick={() => {
                if (cardState > 0) {
                  setCardState(cardState - 1);
                }
              }}
            >
              <p className="sr-only">Carousel left</p>
              <ChevronLeft size={14} />
            </Button>

            <Button
              name="carousel-right"
              disabled={cardState === 1}
              className="relative -z-[51] w-fit rounded-none px-1 opacity-0 disabled:opacity-0 group-hover:z-[51] group-hover:opacity-100 group-hover:disabled:opacity-50"
              onClick={() => {
                if (cardState < 1) {
                  setCardState(cardState + 1);
                }
              }}
            >
              <p className="sr-only">Carousel Right</p>
              <ChevronRight size={14} />
            </Button>
          </div>
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
            className="h-[400px] w-[calc(100%-30px)]"
          />
        )}
        {cardState === 1 && (
          <div className="absolute top-0 z-[52] flex h-12 w-full items-end justify-end p-2">
            <button onClick={toggleFavorite} aria-label="Favorite">
              {isFavorited ? (
                <IoHeartSharp size={24} className="text-primary" />
              ) : (
                <IoHeartOutline size={24} className="text-white" />
              )}
            </button>
          </div>
        )}
        <div className="py-2">
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
                aria-label="Get Quote"
                variant="ghost"
                className="h-fit p-0 font-[900] text-primary hover:bg-transparent hover:text-primary/70"
                onClick={toggleOverlay}
              >
                Get Quote
              </Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default HomePackageCard;

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
        "mySwiper relative h-[400px]",
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
        const smallImage =   image?.attributes?.formats?.medium;
        const fallbackImg = image?.attributes;
        const optImg = fallbackImg;

        //@ts-ignore
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
                className="h-full w-full rounded rounded-es-3xl rounded-se-3xl object-cover transition-transform duration-2000 ease-linear group-hover:scale-110 group-hover:rounded-es-3xl"

                //                className="h-full w-full rounded object-cover transition-[object-position] duration-3000 ease-linear group-hover:object-[50%_0%]"
              />
            </SwiperSlide>
          )
        );
      })}
    </Swiper>
  );
};
