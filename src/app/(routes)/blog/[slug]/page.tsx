import BlogDetail from "@/components/blog/blog-detail";
import CommonBanner from "@/components/ui/common-banner";
import { getSingleBlog } from "@/server/blogs/get-single-blog";

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
      <BlogDetail blog={blog} />
    </main>
  );
}
