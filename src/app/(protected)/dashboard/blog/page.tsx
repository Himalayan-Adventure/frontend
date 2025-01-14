import BlogCard from "@/components/blog/blog-card";
import { Text } from "@/components/ui/text";
import { CategoriesFilter } from "./categories-filter";
import { AddButton } from "./add-button";
import { Suspense } from "react";
import { getBlogs } from "@/server/blogs/get-blogs";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import TablePagination from "@/components/table/table-pagination";
import { getCurrentUserData } from "@/server/auth/get-me";

export const metadata: Metadata = {
  title: `Blog Dashboard`,
  description: ` ${siteConfig.siteName}`,
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { code?: string; tag?: string; page?: number };
}) {
  const { code, tag, page } = searchParams;
  const user = await getCurrentUserData();

  const data = await getBlogs({ ...searchParams, authorID: user?.id });
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
        <div className="grid sm:grid-cols-[repeat(auto-fit,350px)] gap-4 lg:gap-8">
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
      {data.meta && <TablePagination meta={data.meta} dataLen={blogs.length} />}
    </section>
  );
}
