"use client";
import ProductCard from "./product-card";

export default function OurProducts({ products }: any) {
  return (
    <section className="container mx-auto py-8 lg:py-16">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold md:text-xl lg:text-3xl">
          Explore Our Products
        </h2>
        {/* Uncomment the button below if "View All" functionality is added */}
        {/* <button
          onClick={handleViewAllClick}
          className="rounded bg-black px-4 py-2 text-white"
        >
          View All
        </button> */}
      </div>

      {products?.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {products.map((product: any) => (
            <ProductCard
              key={product?.id}
              slug={product?.attributes?.slug}
              id={product?.id}
              name={product?.attributes?.name}
              description={product?.attributes?.description} // Fixed typo
              price={product?.attributes?.price}
              discountRate={product?.attributes?.discount_rate}
              rentAvailable={product?.attributes?.rentAvailable}
              rentPrice={product?.attributes?.rentPrice}
              stockCount={product?.attributes?.stockCount}
              colors={product?.attributes?.colors} // Updated property name
              rating={4}
              reviews={54}
              img={product?.attributes?.image?.data?.[0]?.attributes?.url}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-lg font-semibold text-gray-500">
          No products available at the moment.
        </div>
      )}
    </section>
  );
}
