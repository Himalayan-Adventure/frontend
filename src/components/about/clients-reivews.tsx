/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LazyMotion, domMax, m } from "framer-motion";

interface ClientReview {
  name: string;
  message: string;
  image: string;
  designation: string;
}

const clientReviews: ClientReview[] = [
  {
    name: "John Doe",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nisi non urna scelerisque, sit amet condimentum enim posuere.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    designation: "Mr. Doe",
  },
  {
    name: "Jane Smith",
    message:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    designation: "Ms. Smith",
  },
  {
    name: "Michael Brown",
    message:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    designation: "Mr. Brown",
  },
  {
    name: "Emily Davis",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec lacus id ipsum cursus auctor.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    designation: "Ms. Davis",
  },
  {
    name: "William Johnson",
    message:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    designation: "Mr. Johnson",
  },
  {
    name: "Sophia Martinez",
    message:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    designation: "Ms. Martinez",
  },
];

export default function ClientsReviews() {
  const [activeCard, setActiveCard] = useState<ClientReview | null>(
    clientReviews[0],
  );

  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="lg:py-16"
      >
        <section className="container py-8 lg:px-24 lg:py-16">
          <div className="text-center text-lg font-[600] uppercase md:text-2xl lg:text-[40px]">
            <h2 className="text-black">WHAT OUR CLIENTS SAY..</h2>
            <div className="mt-3 flex justify-center lg:mt-6">
              <div className="h-1 w-40 rounded-xl bg-black" />
            </div>
          </div>

          {/* Active client's name and message */}
          {activeCard && (
            <div className="mt-8 flex flex-col md:flex-row md:space-x-8">
              <div>
                <img
                  src={activeCard.image}
                  alt={activeCard.name}
                  className="mb-4 h-24 w-32 rounded-lg object-cover shadow-md transition-transform duration-300 md:h-40 md:w-52"
                />
              </div>

              <div>
                <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-lg lg:text-xl">
                  {activeCard.message}
                </p>
                <div className="mt-4 flex flex-row items-center space-x-4">
                  <div className="h-1 w-16 rounded-lg bg-black md:w-32" />
                  <h3 className="text-sm font-bold md:text-base">
                    {activeCard?.name}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Review cards carousel */}
          <div className="relative">
            <Carousel
              className="relative w-full"
              setApi={(api: any) => {
                api.on("select", () => {
                  const selectedIndex = api.selectedScrollSnap();
                  setActiveCard(clientReviews[selectedIndex]);
                });
              }}
            >
              <CarouselContent className="flex space-x-3 py-16">
                {clientReviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="w-full md:basis-1/2 lg:basis-1/3"
                  >
                    <MessageCard
                      review={review}
                      isActive={activeCard?.name === review.name}
                      onClick={() => setActiveCard(review)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 p-2">
                <button className="rounded-full bg-gray-200 p-2 text-black shadow-lg hover:bg-gray-300">
                  &larr;
                </button>
              </CarouselPrevious>
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
                <button className="rounded-full bg-gray-200 p-2 text-black shadow-lg hover:bg-gray-300">
                  &rarr;
                </button>
              </CarouselNext>
            </Carousel>
          </div>
        </section>
      </m.section>
    </LazyMotion>
  );
}

function MessageCard({
  review,
  isActive,
  onClick,
}: {
  review: ClientReview;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative flex cursor-pointer flex-col p-8 transition-all duration-300 ${
        isActive ? "bg-gray-900" : "border hover:bg-gray-100"
      } rounded-lg shadow-xl shadow-gray-400`}
    >
      {/* Profile Image */}
      <div className="flex justify-center">
        <div className="absolute -top-10">
          <img
            src={review.image}
            alt={review.name}
            className="h-20 w-20 rounded-full border border-gray-500 shadow-lg"
          />
        </div>
      </div>

      {/* Message/Quote */}
      <p
        className={`mt-12 line-clamp-3 text-sm lg:text-base ${isActive ? "text-gray-100" : "text-gray-600"}`}
      >
        {review.message}
      </p>

      {/* Name and Designation */}
      <h3
        className={`mb-2 mt-4 text-sm font-semibold md:text-base ${isActive ? "text-gray-100" : "text-orange-600"} `}
      >
        {review.name}
      </h3>

      {/* Button */}
      <div className="flex">
        <button
          className={`rounded-lg px-4 py-2 text-sm font-medium md:text-base ${isActive ? "bg-white text-black" : "bg-black text-white"}`}
        >
          {review.designation}
        </button>
      </div>
    </div>
  );
}
