// OurProducts.tsx
"use client";
import { IProduct } from "@/types/products/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "./product-card";

export default function BestSellingProducts({ products }: any) {
  const router = useRouter();

  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [viewedProducts, setViewedProducts] = useState<number[]>([]);

  return (
    <section className="container">
      <div className="mb-4 flex space-x-2 lg:mb-8 lg:space-x-4">
        <div className="h-auto w-3 rounded bg-black md:w-4"></div>
        <div className="">
          <h2 className="font-poppins font-semibold md:text-lg lg:text-xl">
            This Month
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold lg:text-3xl">
          Best Selling Products
        </h2>
        {/* <button
          onClick={handleViewAllClick}
          className="rounded bg-black px-2 py-1 text-sm text-white lg:px-4 lg:py-2 lg:text-base"
        >
          View All
        </button> */}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-12">
        {products?.map((product: any) => (
          <ProductCard
            key={product?.id}
            slug={product?.attributes?.slug}
            id={product?.id}
            name={product?.attributes?.name}
            description={product?.attributes?.descsription}
            price={product?.attributes?.price}
            discountRate={product?.attributes?.discount_rate}
            rentAvailable={product?.attributes?.rentAvailable}
            rentPrice={product?.attributes?.rentPrice}
            stockCount={product?.attributes?.stockCount}
            colors={product?.attributes?.count}
            rating={4}
            reviews={54}
            img={product?.attributes?.image?.data?.[0]?.attributes?.url}
          />
        ))}
      </div>
    </section>
  );
}
