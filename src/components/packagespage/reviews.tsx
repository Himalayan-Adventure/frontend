"use client";
import React, { useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function Reviews() {
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);

  const ratings = [
    { label: "Cleanliness", score: 5.0 },
    { label: "Accuracy", score: 5.0 },
    { label: "Communication", score: 3.0 },
    { label: "Location", score: 4.9 },
    { label: "Check-in", score: 5.0 },
    { label: "Value", score: 4.7 },
  ];

  const allReviews = [
    {
      name: "Jose",
      date: "December 2021",
      text: "Host was very attentive.",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      name: "Luke",
      date: "December 2021",
      text: "Nice place to stay!",
      avatar: "/path/to/avatar2.jpg",
    },
    {
      name: "Shayna",
      date: "December 2021",
      text: "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive.",
      avatar: "/path/to/avatar3.jpg",
    },
    {
      name: "Josh",
      date: "November 2021",
      text: "Well designed and fun space, neighborhood has lots of energy and amenities.",
      avatar: "/path/to/avatar4.jpg",
    },
    {
      name: "Vladko",
      date: "November 2020",
      text: "This is amazing place. It has everything one needs for a monthly business stay. Very clean and organized place. Amazing hospitality affordable price.",
      avatar: "/path/to/avatar5.jpg",
    },
    {
      name: "Jennifer",
      date: "January 2022",
      text: "A centric place, near of a sub station and a supermarket with everything you need.",
      avatar: "/path/to/avatar6.jpg",
    },
    {
      name: "Alex",
      date: "February 2022",
      text: "Fantastic service and a great place to stay! Highly recommended.",
      avatar: "/path/to/avatar7.jpg",
    },
    {
      name: "Taylor",
      date: "March 2022",
      text: "The neighborhood was vibrant and the place was perfect for a weekend getaway. Would definitely stay here again!",
      avatar: "/path/to/avatar8.jpg",
    },
    {
      name: "Morgan",
      date: "April 2022",
      text: "An amazing experience! The location was central and the amenities were top-notch. Perfect for both short and long stays.",
      avatar: "/path/to/avatar9.jpg",
    },
  ];

  const reviewsToShow = showMoreReviews ? allReviews : allReviews.slice(0, 6);

  const toggleShowMore = (index: any) => {
    setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
  };

  return (
    <section className="container py-4 lg:py-8">
      <div>
        <h1 className="mb-4 flex items-center space-x-2 text-xl font-semibold">
          <FaStar className="text-yellow-500" />
          <span>5.0</span>
          <span className="list-disc">· {allReviews.length} reviews</span>
        </h1>

        <div className="mb-8 grid max-w-[70vw] gap-4 md:grid-cols-2 md:gap-x-8 lg:mb-16 lg:gap-x-32">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-4"
            >
              <p className="text-sm md:text-base">{rating.label}</p>
              <div className="flex items-center space-x-2">
                <div className="h-1 w-16 overflow-hidden bg-gray-300 md:w-24">
                  <div
                    className="h-full bg-black"
                    style={{ width: `${(rating.score / 5) * 100}%` }}
                  />
                </div>
                <p className="text-sm md:text-base">
                  {rating.score.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-x-16">
          {reviewsToShow.map((review, index) => (
            <div key={index} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>{review.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href="/climber-profile"
                  className="text-sm font-semibold md:text-lg"
                >
                  {review.name}
                </Link>
                <p className="text-xs text-gray-500">{review.date}</p>
                <p className="mt-2 text-sm md:text-lg">
                  {expandedReviewIndex === index || review.text.length <= 100
                    ? review.text
                    : `${review.text.slice(0, 100)}...`}
                </p>
                {review.text.length > 100 && (
                  <button
                    className="mt-1 flex items-center space-x-2 underline"
                    onClick={() => toggleShowMore(index)}
                  >
                    <span>
                      {expandedReviewIndex === index
                        ? "Show less"
                        : "Show more"}
                    </span>
                    <FaChevronRight className="text-xs" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-6 block rounded-lg border border-black px-4 py-2 text-sm text-black hover:bg-gray-200 md:text-base"
          onClick={() => setShowMoreReviews(!showMoreReviews)}
        >
          {showMoreReviews
            ? `Show less`
            : `Show all ${allReviews.length} reviews`}
        </button>
      </div>
    </section>
  );
}
