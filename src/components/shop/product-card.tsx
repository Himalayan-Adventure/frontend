// components/shop/product-card.tsx
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { PiEyeClosed } from "react-icons/pi";
import { StarRating } from "./star-rating";
import Link from "next/link";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  img: string;
  likedProducts: number[];
  viewedProducts: number[];
  onToggleLike: (id: number) => void;
  onToggleView: (id: number) => void;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  img,
  likedProducts,
  viewedProducts,
  onToggleLike,
  onToggleView,
}) => {
  const isLiked = likedProducts.includes(id);
  const isViewed = viewedProducts.includes(id);

  return (
    <div>
      <Link href={`/shop/${id}`}>
        <div className="group cursor-pointer">
          <div className="relative rounded-lg bg-gray-100 p-4 py-6 transition-all hover:shadow-lg">
            <div className="absolute left-4 top-4 rounded bg-primary px-2 py-1 text-sm text-white">
              {discount}%
            </div>

            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
                onClick={() => onToggleLike(id)}
              >
                {isLiked ? <FaHeart className="text-black" /> : <FaRegHeart />}
              </div>
              <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
                onClick={() => onToggleView(id)}
              >
                {isViewed ? (
                  <FiEye className="text-black" />
                ) : (
                  <PiEyeClosed className="text-gray-600" />
                )}
              </div>
            </div>

            <img
              src={img}
              alt={name}
              className="mx-auto h-40 object-contain transition-all duration-300 group-hover:scale-110"
            />

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black py-2 text-white opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
              Add to Cart
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-primary">Rs {price}</span>
              <span className="text-gray-400 line-through">
                Rs {originalPrice}
              </span>
            </div>
            <StarRating rating={rating} reviews={reviews} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
