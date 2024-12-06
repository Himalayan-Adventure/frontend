"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { StarRating } from "./star-rating";
import { useCart } from "@/contexts/CartContext";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  rentAvailable: boolean;
  rentPrice: number;
  discountRate: number;
  stockCount: number;
  slug: string;
  rating: number;
  reviews: number;
  img: string;
  colors: Color[];
}

interface Color {
  id: number;
  color: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  discountRate,
  rating,
  reviews,
  img,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useCart();

  const isInCart = cartItems.some((item) => item.id === id);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsLiked(favorites.includes(id));
    }
  }, [id]);

  const handleToggleLike = () => {
    if (typeof window !== "undefined") {
      setIsLiked((prev) => {
        const updatedLikedStatus = !prev;
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (updatedLikedStatus) {
          favorites.push(id);
        } else {
          const index = favorites.indexOf(id);
          if (index > -1) favorites.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        return updatedLikedStatus;
      });
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart({
        id,
        name,
        price,
        img,
        quantity: 1,
        color: "",
        subtotal: price * 1,
      });
    }
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-lg bg-gray-100 p-4 py-6 transition-all hover:shadow-lg">
        {discountRate && (
          <div className="absolute left-4 top-4 rounded bg-primary px-2 py-1 text-sm text-white">
            {discountRate}%
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleLike();
            }}
          >
            {isLiked ? <FaHeart className="text-black" /> : <FaRegHeart />}
          </div>
        </div>

        {/* Product Image Link */}
        <Link href={`/shop/${id}`}>
          <img
            src={img}
            alt={name}
            className="mx-auto h-40 object-contain transition-all duration-300 group-hover:scale-110"
          />
        </Link>

        {/* Add to Cart Overlay */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="absolute bottom-0 left-0 right-0 flex cursor-pointer items-center justify-center bg-black py-2 text-white opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100"
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-primary">Rs {price}</span>
        </div>
        <StarRating rating={rating} reviews={reviews} />
      </div>
    </div>
  );
};

export default ProductCard;
