/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsBarChartFill, BsCloudHail } from "react-icons/bs";
import { FaMountain, FaStar } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { LuStar } from "react-icons/lu";
import { MdTimelapse, MdTimer } from "react-icons/md";
import wordsToNumbers from "words-to-numbers";

import { cn, formatDate } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { seasonIconMap, seasonMonthMap } from "@/config/ui-constants";
import { TDepartureData } from "@/types/packages/departure";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DepartureFact } from "@/components/packagespage/departure";
import Image from "next/image";
import { format } from "date-fns";

const ProjectCard = ({
  project,
  variant = "default",
}: {
  project: APIResponseData<"api::project.project">;
  variant?: "default" | "similar";
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const attr = project.attributes.package?.data.attributes; // for the related Package attributes
  const projectAttr = project.attributes;

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const departureData = {
    start: attr?.adventure_specification?.travel_dates?.[0]?.date || new Date(),
    end: attr?.adventure_specification?.travel_dates?.[1]?.date || new Date(),
  };

  const toggleOverlay = () => {
    0;
    setIsOverlayVisible(!isOverlayVisible);
  };
  const [currentTarget, setCurrentTarget] = useState<Element | null>(null);
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
      if (
        (e.relatedTarget as HTMLElement).id === `swiper-button-${project.id}`
      ) {
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
        variant === "default"
          ? "bg-white shadow-xl shadow-gray-500"
          : "flex flex-col",
        "group transform cursor-pointer overflow-hidden rounded-xl transition-transform",
      )}
    >
      <div
        id={`swiper-button-${project.id}`}
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
          id={`${project.id}-swapper-ref`}
          className={cn(
            isOverlayVisible ? "z-auto" : "z-[52]",
            "relative h-fit",
          )}
          ref={cardRef}
        >
          {project?.attributes?.package && (
            <SliderComponent
              pkg={project.attributes.package.data}
              type="hover"
              isOverlayVisible={isOverlayVisible}
            />
          )}
        </div>
        {cardState === 0 && project?.attributes?.package && (
          <Overlay
            id={project.id}
            ref={overlayRef}
            pkg={project.attributes.package?.data}
            isOverlayVisible={isOverlayVisible}
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

        {variant !== "similar" ? (
          <>
            <div className="py-2">
              <div className="flex w-full justify-end">
                <p className="flex items-center space-x-1 text-sm">
                  <FaStar className="text-primary" /> <span>5</span>
                </p>
              </div>
              <div>
                <Link prefetch={true} href={`/projects/${project.id}`}>
                  <p className="text-lg font-medium text-primary">
                    {project.attributes.title}
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
            </div>
          </>
        ) : (
          <Link href={`/projects/${project.id}`} className="pt-6">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-sm font-semibold text-primary">
                {attr?.package_name}
              </h1>
              <div className="flex items-center text-primary">
                <FaStar />
                <p className="ml-1 text-sm">4.5</p>
              </div>
            </div>

            {attr?.brief_description && (
              <p className="text-sm text-gray-600">
                {attr?.brief_description?.length > 50
                  ? attr?.brief_description?.slice(0, 50) + "..."
                  : attr?.brief_description}
              </p>
            )}
            {departureData.start && departureData.end && (
              <p className="text-sm text-gray-600">
                {format(departureData.start, "dd")} -&nbsp;
                {format(departureData.end, "dd MMM")}. · Individual Host
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

        {/* detail overlay  */}
      </div>
    </div>
  );
};

export default ProjectCard;

export const SliderComponent = ({
  pkg,
  type,
  isOverlayVisible,
}: {
  pkg: APIResponseData<"api::package.package">;
  type: "hover" | "default";
  isOverlayVisible: boolean;
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
        type === "default"
          ? "absolute left-0"
          : isOverlayVisible
            ? "z-auto block"
            : "z-[52] hidden",
      )}
    >
      {attr?.image?.data?.map(
        (image, index: number) =>
          image?.attributes?.url && (
            <SwiperSlide key={index}>
              <Image
                src={image?.attributes?.url}
                alt={image?.attributes?.name || pkg.attributes.package_name}
                width={image?.attributes?.width || 400}
                height={image?.attributes?.height || 400}
                className="h-96 w-full rounded rounded-es-3xl rounded-se-3xl object-cover"
              />
            </SwiperSlide>
          ),
      )}
    </Swiper>
  );
};

const Overlay = forwardRef<
  HTMLDivElement,
  {
    pkg: APIResponseData<"api::package.package">;
    isOverlayVisible: boolean;
    id: number;
    className?: string;
  }
>((props, ref) => {
  const { pkg, isOverlayVisible, className, id } = props;
  const attr = pkg.attributes;

  const departureData: TDepartureData = {
    //date: pkg?.date as string,
    departure: [
      {
        start:
          attr?.adventure_specification?.travel_dates?.[0]?.date || new Date(),
        end:
          attr?.adventure_specification?.travel_dates?.[1]?.date || new Date(),
      },
    ],
    grade: attr?.adventure_specification?.grade?.[0]?.name || "",
    altitude: attr?.adventure_specification?.max_altitude.toString() || "",
    duration: attr?.adventure_specification?.duration || "",
    season: attr?.adventure_specification?.season?.[0]?.name || "",
  };
  const { duration, season, altitude, grade, departure } = departureData;

  const maxAltInM = Number(
    wordsToNumbers(altitude)?.toString().split(" ").join(""),
  );
  let departureFacts = [];
  if (season)
    departureFacts.push({
      title: season,
      desc: seasonMonthMap[season],
      icon: seasonIconMap[season],
    });
  if (duration) {
    departureFacts.push({
      title: "duration",
      desc: duration + " days",
      icon: <MdTimelapse size={20} />,
    });
  }

  return (
    <div
      id={`overlay-${pkg.id}`}
      ref={ref}
      className={cn(
        className,
        isOverlayVisible ? "z-50 opacity-100" : "-z-50 opacity-0",
        "overlay absolute inset-0 mx-auto flex flex-col justify-between overflow-auto bg-black bg-opacity-70 p-4 text-white transition-all ease-in-out",
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
          <p className="text-sm font-bold">Departure</p>
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
        {departure && departure?.filter((i) => i.start || i.end).length > 0 && (
          <div className="my-2 rounded border bg-white p-1">
            {departure?.map((i, index) => (
              <div
                className="mt-2 flex items-center justify-between"
                key={`departure-${index}`}
              >
                <div className="">
                  <p className="text-xs text-black">Date</p>
                  <p
                    className="text-xs text-gray-500"
                    key={`departure-${index}`}
                  >
                    {formatDate(i?.start as string)} -{" "}
                    {formatDate(i?.end as string)}
                  </p>
                </div>

                <Button className="h-fit rounded-full bg-black px-2 py-0.5 text-xs text-white">
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        )}

        <button className="mt-2 w-full rounded bg-primary py-2 font-semibold text-white hover:bg-orange-500">
          Get Quote
        </button>
      </div>
      <div className="mt-2 space-y-2">
        <p className="mb-2 text-center text-sm">You won’t be charged yet</p>
        {season && (
          <DepartureFact
            title={season}
            desc={seasonMonthMap[season]}
            icon={seasonIconMap[season]}
          />
        )}

        {duration && (
          <DepartureFact
            title={"duration"}
            desc={duration + " days"}
            icon={<MdTimelapse size={20} />}
          />
        )}

        {grade && (
          <DepartureFact
            title="grade"
            desc={grade}
            icon={<BsBarChartFill size={20} />}
          />
        )}

        {altitude && maxAltInM && maxAltInM !== 0 && (
          <DepartureFact
            title="max altitude"
            desc={`${maxAltInM.toLocaleString("en-us")}m/${(maxAltInM * 3.281).toLocaleString("en-us")}ft`}
            icon={<FaMountain size={20} />}
          />
        )}
      </div>

      <hr className="mx-auto mt-2 w-[90%]" />

      <div className="flex w-full justify-center">
        <Link
          prefetch={true}
          href={`/projects/${id}`}
          className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-orange-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
});

Overlay.displayName = "Overlay";
