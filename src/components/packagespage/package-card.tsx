/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { FaMountain, FaRegSnowflake, FaStar } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { LuStar } from "react-icons/lu";
import { MdTimelapse } from "react-icons/md";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const PackageCard = ({ pkg }: any) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="transform cursor-pointer overflow-hidden rounded-xl bg-white p-4 shadow-xl shadow-gray-500 transition-transform">
      <div className="relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={false}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {pkg?.images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={pkg?.title}
                className="h-96 w-full rounded rounded-es-3xl rounded-se-3xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
          <div className="flex w-full justify-end">
            <p className="flex items-center space-x-1 text-sm">
              <FaStar className="text-primary" /> <span>{pkg?.rating}</span>
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-primary">{pkg?.title}</p>
            <p className="mb-2 text-sm font-light md:text-[16px]">
              Host: {pkg?.host}
            </p>
            <button className="font-[900] text-primary" onClick={toggleOverlay}>
              Get Quote
            </button>
          </div>
        </div>

        {/* detail overlay  */}

        {isOverlayVisible && (
          <div className="absolute inset-0 z-50 flex flex-col justify-between overflow-auto bg-black bg-opacity-70 p-4 text-white">
            <div className="flex justify-end">
              <button
                onClick={toggleOverlay}
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
                  <span>{pkg?.rating}</span>
                  <span className="text-xl text-gray-400">·&nbsp;</span>
                  <a href="#" className="underline">
                    7 reviews
                  </a>
                </p>
              </div>
              <div className="my-2 rounded bg-white p-2">
                {pkg?.departureDates.map((date: string, index: number) => (
                  <div
                    key={index}
                    className="mt-2 flex items-end justify-between"
                  >
                    <div className="text-black">
                      <p className="text-[8px]">Date</p>
                      <p className="text-[11px] text-gray-700">{date}</p>
                    </div>
                    <div>
                      <button className="rounded-full bg-black px-2 py-1 text-[9px] text-white">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded bg-primary py-2 font-semibold text-white hover:bg-orange-500">
                Get Quote
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <p className="mb-4 text-center text-sm">
                You won’t be charged yet
              </p>
              <p className="flex items-center space-x-2 text-sm font-medium">
                <FaRegSnowflake size={20} />
                <span>Winter: {pkg?.season}</span>
              </p>
              <p className="flex items-center space-x-2 text-sm font-medium">
                <MdTimelapse size={20} />
                <span>Duration: {pkg?.duration}</span>
              </p>
              <p className="flex items-center space-x-2 text-sm font-medium">
                <BsBarChartFill size={20} />
                <span>Grade: {pkg?.grade}</span>
              </p>
              <p className="flex items-center space-x-2 text-sm font-medium">
                <FaMountain size={20} />
                <span>Max Altitude: {pkg?.maxAltitude}</span>
              </p>
            </div>

            <hr className="mt-2" />

            <div className="flex w-full justify-center">
              <Link
                href={`packages/${pkg?.id}`}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500"
              >
                View Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
