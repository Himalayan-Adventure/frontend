"use client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

export default function HomeCarousel() {
  const [favorites, setFavorites] = useState<number[]>([]);

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

  return (
    <section className="container flex justify-center py-8">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {cardsData.map((card, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="relative p-4">
                <Card className="relative border-none">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full rounded-2xl object-cover lg:h-96"
                  />
                  {/* Favorite Button */}
                  <div className="absolute right-4 top-4">
                    <button
                      onClick={() => toggleFavorite(index)}
                      className="text-white"
                    >
                      {favorites.includes(index) ? (
                        <FaHeart size={24} />
                      ) : (
                        <FaRegHeart size={24} />
                      )}
                    </button>
                  </div>
                </Card>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <p className="font-semibold text-primary">{card.title}</p>
                    <p className="flex items-center space-x-1 text-sm text-primary">
                      <FaStar />
                      <span>{card.rating}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">Host: {card.host}</p>
                  <a
                    href="#"
                    className="text-sm font-bold text-orange-500 text-primary underline"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
