import ProductDetail from "@/components/shop/product-detail";
import RelatedItems from "@/components/shop/related-items";
import CommonBanner from "@/components/ui/common-banner";
import { getProducts } from "@/server/products/get-products";
import { getSingleProduct } from "@/server/products/get-single-product";
import { IProduct } from "@/types/products/products";
import bgImage from "/public/images/planPgBg.png";

interface Params {
  slug: string;
}

import type { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site-config";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug;

  const data = await getSingleProduct(slug);
  if (data.status === 400 || !data.data) {
    return {
      title: "No project found",
      description: `${siteConfig.siteName}`,
    };
  }

  const images = data?.data?.attributes?.image
    ? data?.data?.attributes?.image.data?.map(
        (image: any) => image.attributes.url,
      )
    : [];

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${data.data?.attributes?.name} | ${siteConfig.siteName}`,
    description: ` ${siteConfig.siteDescription}`,
    openGraph: {
      images: [...images, ...previousImages],
    },
  };
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
