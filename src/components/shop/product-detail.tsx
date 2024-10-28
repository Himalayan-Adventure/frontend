"use client";

import { IProduct } from "@/types/products/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsKey } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { LiaSyncSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { StarRating } from "./star-rating";
import Link from "next/link";

export default function ProductDetail({ product }: { product: IProduct }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const colors = ["red", "black", "green"];
  const [selectedColor, setSelectedColor] = useState(colors?.[0]);

  const handleGoBack = () => router.back();
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleFavorite = () => setIsFavorited((prev) => !prev);

  const { attributes } = product;
  const { name, price, description, image } = attributes;

  return (
    <section className="container relative mx-auto p-8 lg:mt-32 lg:py-16">
      <div className="mb-4 lg:mb-8">
        <button onClick={handleGoBack} className="">
          <FaArrowLeft size={20} className="md:size-30" />
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-5 lg:gap-16">
        {/* Product Images Section */}
        <div className="w-full lg:col-span-3">
          <div className="grid grid-cols-4 gap-4 sm:gap-6">
            {/* Thumbnail Images */}
            <div className="col-span-1 grid gap-2 sm:gap-4 lg:grid-cols-none lg:grid-rows-4">
              {image.data.slice(1).map((img, index) => (
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-lg bg-gray-100 p-1 sm:p-2"
                  key={index}
                >
                  <Image
                    src={img.attributes.formats.thumbnail.url}
                    alt={img.attributes.alternativeText || "Product Image"}
                    width={120}
                    height={120}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Main Image Display */}
            <div className="col-span-3 flex items-center justify-center rounded-lg bg-gray-100 p-4 sm:p-6">
              <Image
                src={image.data[0].attributes.url}
                alt="Selected Product Image"
                className="max-w-full rounded object-contain"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:col-span-2">
          <h1 className="mb-2 text-xl font-semibold sm:text-2xl">{name}</h1>
          <div className="mb-4 flex flex-wrap items-center space-x-3 text-sm sm:text-base">
            <StarRating rating={4} reviews={155} />
            <span className="hidden text-gray-800 sm:inline">|</span>
            <p className="text-green-500">In Stock</p>
          </div>
          <p className="mb-2 text-lg md:text-2xl">Rs. {price}</p>
          <p className="mb-4 font-poppins text-sm text-gray-800 md:text-base">
            {description}
          </p>
          <hr className="my-4" />

          {/* Color Selection */}
          <div className="mb-4 flex items-center space-x-2 sm:space-x-4">
            <p className="md:text-lg">Colours:</p>
            <div className="flex items-center gap-2">
              {colors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="radio"
                    name="color"
                    className="hidden"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                  />
                  <div
                    className={`flex h-3 w-3 items-center justify-center rounded-full sm:h-4 sm:w-4 ${
                      selectedColor === color ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span
                      className="h-2 w-2 rounded-full sm:h-3 sm:w-3"
                      style={{ backgroundColor: color }}
                    ></span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity Selector and Buttons */}
          <div className="mb-8 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center rounded border border-gray-700">
              <button
                onClick={decrement}
                className="flex items-center justify-center rounded-l px-2 py-1 text-lg font-semibold text-gray-800 hover:bg-gray-800 hover:text-white sm:px-4 sm:py-2"
              >
                −
              </button>
              <div className="border-l border-r border-gray-700 px-2 py-1 text-center text-base sm:px-4 sm:py-2 sm:text-lg md:text-xl">
                {quantity}
              </div>
              <button
                onClick={increment}
                className="flex items-center justify-center rounded-r px-2 py-1 text-lg font-semibold text-gray-800 hover:bg-gray-800 hover:text-white sm:px-4 sm:py-2"
              >
                +
              </button>
            </div>
            <button className="w-full flex-grow rounded bg-black px-4 py-2 text-sm text-white sm:w-auto sm:px-6 sm:py-2 lg:text-lg">
              Buy Now
            </button>
            <button
              onClick={toggleFavorite}
              className="rounded border border-gray-800 px-3 py-2"
            >
              {isFavorited ? (
                <IoHeart className="text-xl text-gray-800" />
              ) : (
                <IoHeartOutline className="text-xl text-gray-800" />
              )}
            </button>
          </div>

          {/* services  */}
          <div className="grid divide-y divide-gray-400 rounded-lg border border-gray-400 font-poppins">
            {/* Free Delivery */}
            <div className="flex items-center space-x-4 p-4 lg:p-6">
              <TbTruckDelivery className="text-2xl lg:text-3xl" />
              <div>
                <h3 className="text-sm font-semibold md:text-base">
                  Free Delivery
                </h3>
                <p className="text-xs text-gray-800 underline md:text-sm">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            {/* Return Delivery */}
            <div className="flex items-center space-x-4 p-4 lg:p-6">
              <LiaSyncSolid className="text-2xl lg:text-3xl" />
              <div>
                <h3 className="text-sm font-semibold md:text-base">
                  Return Delivery
                </h3>
                <p className="text-xs text-gray-800 md:text-sm">
                  Free 30 Days Delivery Returns.{" "}
                  <Link href="#" className="underline">
                    Details
                  </Link>
                </p>
              </div>
            </div>

            {/* Rental Available */}
            <div className="flex items-center space-x-4 p-4 lg:p-6">
              <BsKey className="text-2xl lg:text-3xl" />
              <div className="">
                <h3 className="text-sm font-semibold md:text-base">
                  Rental Available
                </h3>
                <p className="text-xs text-gray-800 md:text-sm">
                  Lorem ipsum.{" "}
                  <Link href="#" className="underline">
                    Details
                  </Link>
                </p>
              </div>
              <button className="rounded bg-black px-4 py-1 text-xs text-white md:text-sm">
                RENT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
