/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useMemo, useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export interface Review {
  id: number;
  attributes: {
    rating: number;
    review: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cleanlinessRating: number;
    communicationRating: number;
    checkInRating: number;
    accuracyRating: number;
    locationRating: number;
    valueRating: number;
    users_permissions_user: {
      data: {
        id: number;
        attributes: {
          username: string;
        };
      };
    };
  };
}

export interface ReviewsProp {
  reviews: {
    data: Review[];
  };
}

export default function Reviews({ reviews }: ReviewsProp) {
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(
    null,
  );

  const allReviews = Array.isArray(reviews?.data) ? reviews.data : [];
  const getAverage = (field: keyof Review["attributes"]) => {
    const total = allReviews?.reduce((sum, r) => {
      const val = r.attributes[field];
      return typeof val === "number" ? sum + val : sum;
    }, 0);
    return total / allReviews.length;
  };

  const ratings = useMemo(
    () => [
      { label: "Cleanliness", score: getAverage("cleanlinessRating") },
      { label: "Accuracy", score: getAverage("accuracyRating") },
      { label: "Communication", score: getAverage("communicationRating") },
      { label: "Location", score: getAverage("locationRating") },
      { label: "Check-in", score: getAverage("checkInRating") },
      { label: "Value", score: getAverage("valueRating") },
    ],
    [reviews],
  );

  const overallRating = useMemo(
    () => getAverage("rating").toFixed(1),
    [reviews],
  );

  const reviewsToShow = showMoreReviews ? allReviews : allReviews.slice(0, 6);

  const handleToggleReview = (index: number) =>
    setExpandedReviewIndex((prev) => (prev === index ? null : index));

  return (
    <section className="container py-4 lg:py-8">
      <div>
        <h1 className="mb-4 flex items-center space-x-2 text-xl font-semibold">
          <FaStar className="text-yellow-500" />
          <span>{overallRating}</span>
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
          {reviewsToShow.map((review, index) => {
            const {
              review: reviewText,
              createdAt,
              users_permissions_user,
            } = review.attributes;
            const username =
              users_permissions_user?.data?.attributes?.username || "Anonymous";

            const isExpanded = expandedReviewIndex === index;
            const showToggle = reviewText.length > 100;

            return (
              <div key={review.id} className="flex space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`/avatar-${index + 1}.jpg`}
                    alt={username}
                  />
                  <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    href="/climber-profile"
                    className="text-sm font-semibold md:text-lg"
                  >
                    {username}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(createdAt).toLocaleString("default", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p className="mt-2 text-sm md:text-lg">
                    {isExpanded || !showToggle
                      ? reviewText
                      : `${reviewText.slice(0, 100)}...`}
                  </p>
                  {showToggle && (
                    <button
                      onClick={() => handleToggleReview(index)}
                      className="mt-1 flex items-center space-x-2 underline"
                    >
                      <span>{isExpanded ? "Show less" : "Show more"}</span>
                      <FaChevronRight className="text-xs" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allReviews.length > 6 && (
          <button
            className="mt-6 block rounded-lg border border-black px-4 py-2 text-sm text-black hover:bg-gray-200 md:text-base"
            onClick={() => setShowMoreReviews(!showMoreReviews)}
          >
            {showMoreReviews
              ? `Show less`
              : `Show all ${allReviews.length} reviews`}
          </button>
        )}
      </div>
    </section>
  );
}
