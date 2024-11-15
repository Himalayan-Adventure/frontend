import BlogsList from "@/components/blog/blogs-list";
import CommonBanner from "@/components/ui/common-banner";
import { getBlogCategories } from "@/server/blogs/get-blog-categories";
import { getBlogs } from "@/server/blogs/get-blogs";

export default async function BlogsPage() {
  const blogs = await getBlogs();
  console.log("test", blogs);
  const categories = await getBlogCategories();

  return (
    <main>
      <CommonBanner title="Blogs" />
      <BlogsList blogs={blogs?.data} categories={categories?.data} />
    </main>
  );
}
