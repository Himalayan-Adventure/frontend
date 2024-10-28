"use client";
import Benefits from "@/components/shop/benefits";
import BestSellingProducts from "@/components/shop/best-selling-products";
import OurProducts from "@/components/shop/our-products";
import ProductFilterBar from "@/components/shop/product-filterbar";
import CommonBanner from "@/components/ui/common-banner";
import { IProduct } from "@/types/products/products";
import { useState } from "react";
import bgImage from "/public/images/planPgBg.png";

export default function ShopPage({
  products,
  bestSellingProducts,
  categories,
}: any) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("");

  const getSortedProducts = (products: IProduct[], option: string) => {
    const sortedProducts = [...products];

    if (option === "Price: Low to High") {
      return sortedProducts.sort(
        (a, b) => a.attributes.price - b.attributes.price,
      );
    } else if (option === "Price: High to Low") {
      return sortedProducts.sort(
        (a, b) => b.attributes.price - a.attributes.price,
      );
    } else if (option === "Name: A to Z") {
      return sortedProducts.sort((a, b) =>
        a.attributes.name.localeCompare(b.attributes.name),
      );
    } else if (option === "Name: Z to A") {
      return sortedProducts.sort((a, b) =>
        b.attributes.name.localeCompare(a.attributes.name),
      );
    }

    return sortedProducts;
  };

  const filteredProducts =
    selectedCategory === "All Categories"
      ? getSortedProducts(products?.data, sortOption)
      : getSortedProducts(
          products?.data?.filter((product: IProduct) =>
            product.attributes?.shop_categories?.data?.some(
              (category: any) =>
                category?.attributes?.name === selectedCategory,
            ),
          ),
          sortOption,
        );

  const BestFilteredProducts =
    selectedCategory === "All Categories"
      ? getSortedProducts(bestSellingProducts?.data, sortOption)
      : getSortedProducts(
          bestSellingProducts?.data?.filter((product: IProduct) =>
            product.attributes?.shop_categories?.data?.some(
              (category: any) =>
                category?.attributes?.name === selectedCategory,
            ),
          ),
          sortOption,
        );

  return (
    <>
      <CommonBanner title="Shop" bgImage={bgImage} />
      <ProductFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <BestSellingProducts products={BestFilteredProducts} />
      <Benefits />
      <OurProducts products={filteredProducts} />
    </>
  );
}
