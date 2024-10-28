import { getSingleProduct } from "@/server/products/get-single-product";
import bgImage from "/public/images/planPgBg.png";
import CommonBanner from "@/components/ui/common-banner";
import { IProduct } from "@/types/products/products";
import ProductDetail from "@/components/shop/product-detail";
import RelatedItems from "@/components/shop/related-items";
import { getProducts } from "@/server/products/get-products";

interface Params {
  slug: string;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = params;
  const data = await getSingleProduct(slug);
  if (data.status === 404) {
    return (
      <div className="h-96">
        <CommonBanner title={`Package not found`} bgImage={bgImage} />
      </div>
    );
  }

  const product: IProduct = data?.data;
  const products = await getProducts();

  if (!product) {
    return <CommonBanner title={`Product not found`} bgImage={bgImage} />;
  }
  return (
    <main>
      <CommonBanner title={`${product?.attributes?.name}`} bgImage={bgImage} />
      <ProductDetail product={product} />
      <RelatedItems relatedItems={products} />
    </main>
  );
}
