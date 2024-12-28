"use client";
import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { getBlogs } from "@/server/blogs/get-blogs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { LoadMorePagination } from "../services/pagination";
import { useSearchParams } from "next/navigation";
export const BlogCards = () => {
  //const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit")) || 5;
  const {
    data: blogs,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["blogs", limit],
    queryFn: async () => await getBlogs({ limit }),
    placeholderData: keepPreviousData,
  });
  const updateQueryString = useUpdateQueryString();

  return (
    <div className="rounded-xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Blog</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>
        {!blogs?.data || isError ? (
          <Text variant="text-xl">No blogs found</Text>
        ) : isPending ? (
          <Skeleton className="size-20" />
        ) : (
          <div className="flex flex-col space-y-8">
            <div className="grid w-full gap-4 md:grid-cols-2">
              {blogs?.data
                //?.slice(0, limit)
                ?.map((blog) => (
                  <BlogCard blog={blog} key={`blog-${blog.id}`} />
                ))}
            </div>
            {blogs?.data && blogs?.data.length >= 1 && blogs?.meta && (
              <LoadMorePagination
                className={"[&>button]:bg-black"}
                defaultLimit={2}
                disabled={
                  blogs.meta.pagination.total <= blogs.meta.pagination.pageSize
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
