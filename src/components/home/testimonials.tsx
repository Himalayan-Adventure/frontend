/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { m, domMax, LazyMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface ClientReview {
  name: string;
  description: string;
  image: any;
}

export default function Testimonials() {
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isTruncated, setIsTruncated] = useState<boolean[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/home-page?populate=deep`,
        );

        const testimonials =
          response?.data?.data?.attributes?.testimonials || [];
        setClientReviews(testimonials);
      } catch (err) {
        console.error("Failed to load reviews. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkTruncation = () => {
      const truncationStates: boolean[] = clientReviews.map((_, index) => {
        const descriptionElement = descriptionRefs.current[index];
        if (descriptionElement) {
          return (
            descriptionElement.scrollHeight > descriptionElement.clientHeight
          );
        }
        return false;
      });
      setIsTruncated(truncationStates);
    };

    checkTruncation();
  }, [clientReviews]);

  const handleToggleDescription = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6 }}
        className="py-8 lg:py-16"
      >
        <div className="container">
          {/* Heading */}
          <div className="flex lg:justify-center lg:text-center">
            <div className="lg:max-w-2xl">
              <h1 className="comp-heading">Testimonials</h1>
              <p className="comp-subheading mt-2 lg:mt-4">
                Our clients' success is our success. Hear from those who have
                experienced the exceptional quality and service we provide at
                Himalayan Adventure.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="relative mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 lg:mt-16 lg:gap-y-24">
            {clientReviews.length > 0 ? (
              clientReviews.map((testimonial, index) => {
                const isRightmostInRow = (index + 1) % 3 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex w-full justify-center ${isRightmostInRow ? "" : "md:border-r-0"}`}
                  >
                    <div
                      className={`${
                        !isRightmostInRow
                          ? "before:absolute before:bottom-0 before:right-0 before:top-0 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent md:before:w-[2px]"
                          : ""
                      } px-8 text-center`}
                    >
                      <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border">
                        <Image
                          src={testimonial?.image?.data?.attributes?.url}
                          alt={testimonial.name}
                          className="h-full w-auto object-cover grayscale"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div
                        ref={(el: HTMLDivElement | null) => {
                          descriptionRefs.current[index] = el;
                        }}
                        className={`mt-4 overflow-hidden text-base font-normal text-gray-600 transition-all duration-300 ease-in-out lg:text-lg ${
                          expandedIndex === index
                            ? "max-h-[9999px] py-4"
                            : "max-h-16 py-2"
                        }`}
                      >
                        <p>{testimonial.description}</p>
                      </div>
                      {/* Show "Read More" only if description is truncated */}
                      {isTruncated[index] && (
                        <button
                          onClick={() => handleToggleDescription(index)}
                          className="mt-1 inline-flex items-center text-sm text-primary"
                        >
                          <span
                            className={`${expandedIndex === index ? "" : "line-clamp-3"}`}
                          >
                            {expandedIndex === index
                              ? "Show Less"
                              : "Read More"}
                          </span>
                        </button>
                      )}
                      <p className="mt-1 text-lg font-bold lg:text-[20px]">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600">
                No testimonials available.
              </p>
            )}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
