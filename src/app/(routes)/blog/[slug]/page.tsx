import BlogDetail from "@/components/blog/blog-detail";
import CommonBanner from "@/components/ui/common-banner";
import { getSingleBlog } from "@/server/blogs/get-single-blog";

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

  const data = await getSingleBlog(slug);
  if (!data?.data || data?.status !== 200) {
    return {
      title: "No blog found",
      description: `${siteConfig.siteName}`,
    };
  }

  const image =
    data?.data?.data?.attributes?.thumbnail?.data?.attributes?.url || "";

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.data?.data?.attributes?.title,
    openGraph: {
      images: [image, ...previousImages],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const blog = await getSingleBlog(slug);

  return (
    <main>
      <CommonBanner title="Blog" />
      <BlogDetail blog={blog?.data} />
    </main>
  );
}
