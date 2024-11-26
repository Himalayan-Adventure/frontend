import BlogCard from "@/components/blog/blog-card";
import { Text } from "@/components/ui/text";
import { CategoriesFilter } from "./categories-filter";
import { AddButton } from "./add-button";
import { Suspense } from "react";
import { getBlogs } from "@/server/blogs/get-blogs";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { code?: string; tag?: string };
}) {
  const { code, tag } = searchParams;

  const data = await getBlogs();
  const blogs = data.data;
  return (
    <section className="space-y-8 font-poppins">
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Blogs
        </Text>

        <Link href="/dashboard/blog/write" prefetch={true}>
          <div className="flex items-center gap-x-2 rounded-lg bg-black px-4 py-2 text-sm text-white">
            <PlusIcon size={16} />
            Create
          </div>
        </Link>
      </span>

      <Suspense>
        <CategoriesFilter />
      </Suspense>

      {/* Blogs */}

      <div className="flex flex-col space-y-8">
        {(!blogs || blogs.length === 0) && (
          <Text variant="text-xl">No blogs found</Text>
        )}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {(code
            ? blogs.filter((i) => i.attributes.title.includes(code || ""))
            : blogs
          )?.map((blog) => (
            <BlogCard
              variant="edit"
              blog={blog}
              key={`blog-${blog.attributes.title}-${blog.attributes.publishedAt}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
