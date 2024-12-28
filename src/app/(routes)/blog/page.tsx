import BlogsList from "@/components/blog/blogs-list";
import TablePagination from "@/components/table/table-pagination";
import CommonBanner from "@/components/ui/common-banner";
import { getCurrentUserData } from "@/server/auth/get-me";
import { getBlogCategories } from "@/server/blogs/get-blog-categories";
import { getBlogs } from "@/server/blogs/get-blogs";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  const blogs = await getBlogs({ ...searchParams });
  const categories = await getBlogCategories();

  return (
    <main>
      <CommonBanner title="Blogs" />
      <BlogsList blogs={blogs?.data} categories={categories?.data} />
      {blogs.data.length >= 1 && blogs.meta && (
        <TablePagination
          meta={blogs.meta}
          dataLen={blogs.data.length}
          className="mt-10"
        />
      )}
    </main>
  );
}
