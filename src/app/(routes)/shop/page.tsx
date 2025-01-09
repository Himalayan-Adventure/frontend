import ShopPage from "@/components/shop/shop-page";
import CommonBanner from "@/components/ui/common-banner";
import { getCategories } from "@/server/products/get-categories";
import { getProducts } from "@/server/products/get-products";
import bgImage from "/public/images/planPgBg.png";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Shop Page | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function Shop() {
  const products = await getProducts();
  const categories = await getCategories();

  if (!products || products?.data?.length === 0) {
    return (
      <main>
        <CommonBanner title="Shop" bgImage={bgImage} />
        <p className="container relative text-xl font-semibold text-gray-600 lg:mt-32">
          No products available at the moment. Please check back later.
        </p>
      </main>
    );
  }

  if (!categories || categories?.data?.length === 0) {
    return (
      <main className="py-10 text-center">
        <p className="text-xl font-semibold text-gray-600">
          No categories available at the moment. Please check back later.
        </p>
      </main>
    );
  }

  return (
    <main>
      <ShopPage
        products={products}
        categories={categories}
        bestSellingProducts={products}
      />
    </main>
  );
}
