// OurProducts.tsx
"use client";
import { IProduct } from "@/types/products/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "./product-card";

export default function RelatedItems({ relatedItems }: any) {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [viewedProducts, setViewedProducts] = useState<number[]>([]);

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
    <section className="container relative mx-auto py-8 lg:py-16">
      <div className="mb-4 flex space-x-2 lg:mb-8 lg:space-x-4">
        <div className="h-auto w-3 rounded bg-black md:w-4"></div>
        <div className="">
          <h2 className="font-poppins font-semibold md:text-lg lg:text-xl">
            Related Items
          </h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-12">
        {relatedItems?.map((product: any) => (
          <ProductCard
            key={product?.id}
            slug={product?.slug}
            id={product?.id}
            documentId={product?.documentId}
            name={product?.name}
            description={product?.descsription}
            price={product?.price}
            discountRate={product?.discount_rate}
            rentAvailable={product?.rentAvailable}
            rentPrice={product?.rentPrice}
            stockCount={product?.stockCount}
            colors={product?.count}
            rating={4}
            reviews={54}
            img={product?.image?.[0]?.url}
          />
        ))}
      </div>
    </section>
  );
}
