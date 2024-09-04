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
  return (
    <section className="container py-4 lg:py-8">
      <div>
        <h2 className="mb-6 text-lg font-semibold md:text-xl lg:text-2xl">
          Similar Packages
        </h2>
        <div className="grid w-full gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ name, views, date, price, rating, imageUrl, images }: any) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="w-full">
      {/* Image slider section with favorite button */}
      <div className="relative w-full overflow-hidden">
        <div className="overflow-hidden">
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
            {/*@ts-ignore*/}
            {images?.map((image: any, index: number) => (
              <SwiperSlide key={index} className="w-60">
                <img
                  src={image?.url}
                  alt={image?.name}
                  className="max-h-60 w-full rounded-xl object-cover grayscale"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="absolute top-0 z-10 flex h-12 w-full items-end justify-end p-2">
          <button onClick={toggleFavorite} aria-label="Favorite">
            {isFavorited ? (
              <IoHeartSharp size={24} className="text-primary" />
            ) : (
              <IoHeartOutline size={24} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Package Details */}
      <div className="pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-sm font-semibold text-primary">{name}</h1>
          <div className="flex items-center text-primary">
            <FaStar />
            <p className="ml-1 text-sm">{rating}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">{views}</p>
        <p className="text-sm text-gray-600">{date}</p>

        <p className="mt-2 text-lg font-[900] text-primary underline">
          {price}
        </p>
      </div>
    </div>
  );
};

export default SimilarPackages;
