// ShopPage.tsx
import ShopPage from "@/components/shop/shop-page";
import { getCategories } from "@/server/products/get-categories";
import { getProducts } from "@/server/products/get-products";

export default async function Shop() {
  const products = await getProducts();
  const categories = await getCategories();

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
