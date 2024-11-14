// components/shop/our-products.tsx
"use client";
import { IProduct } from "@/types/products/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "./product-card";

export default function OurProducts({ products }: any) {
  const router = useRouter();
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [viewedProducts, setViewedProducts] = useState<number[]>([]);

  const handleViewAllClick = () => router.push("/all-products");

  const toggleLike = (id: number) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const toggleView = (id: number) => {
    setViewedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  return (
    <section className="container mx-auto py-8 lg:py-16">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold md:text-xl lg:text-3xl">
          Explore Our Products
        </h2>
        {/* <button
          onClick={handleViewAllClick}
          className="rounded bg-black px-4 py-2 text-white"
        >
          View All
        </button> */}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
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
