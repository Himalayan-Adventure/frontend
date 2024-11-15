"use client";
import { useState } from "react";
import ProductFilterBar from "@/components/shop/product-filterbar";
import { IProduct } from "@/types/products/products";
import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/planPgBg.png";
import BestSellingProducts from "./best-selling-products";
import Benefits from "./benefits";
import OurProducts from "./our-products";

export default function ShopPage({
  products,
  bestSellingProducts,
  categories,
}: any) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredProducts = (products: any) => {
    let filteredProducts = products;

    if (selectedCategory !== "All Categories") {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.attributes.shop_categories.data.some(
          (category: any) => category.attributes.name === selectedCategory,
        ),
      );
    }

    if (selectedSubcategory) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.attributes.shop_sub_categories?.data.some(
          (sub: any) => sub.attributes.name === selectedSubcategory,
        ),
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.attributes.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );
    }

    return getSortedProducts(filteredProducts);
  };

  const getSortedProducts = (products: IProduct[]) => {
    const sortedProducts = [...products];

    switch (sortOption) {
      case "Price: Low to High":
        return sortedProducts.sort(
          (a, b) => a.attributes.price - b.attributes.price,
        );
      case "Price: High to Low":
        return sortedProducts.sort(
          (a, b) => b.attributes.price - a.attributes.price,
        );
      case "Name: A to Z":
        return sortedProducts.sort((a, b) =>
          a.attributes.name.localeCompare(b.attributes.name),
        );
      case "Name: Z to A":
        return sortedProducts.sort((a, b) =>
          b.attributes.name.localeCompare(a.attributes.name),
        );
      default:
        return sortedProducts;
    }
  };

  const filteredProducts = getFilteredProducts(products.data);
  const bestFilteredProducts = getFilteredProducts(bestSellingProducts.data);

  return (
    <>
      <CommonBanner title="Shop" bgImage={bgImage} />
      <ProductFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
        setSearchQuery={setSearchQuery}
      />
      <BestSellingProducts products={bestFilteredProducts} />
      <Benefits />
      <OurProducts products={filteredProducts} />
    </>
  );
}
