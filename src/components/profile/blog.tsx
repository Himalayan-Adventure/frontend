"use client";
import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { getBlogs } from "@/server/blogs/get-blogs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
export const BlogCards = () => {
  const [limit, setLimit] = useState(6);
  const {
    data: blogs,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => await getBlogs(),
  });

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
                ?.slice(0, limit)
                ?.map((blog) => (
                  <BlogCard blog={blog} key={`blog-${blog.id}`} />
                ))}
            </div>
            <Button
              className="self-center bg-foreground px-8 py-4"
              onClick={() =>
                setLimit((prev) => {
                  return limit < blogs?.data?.length ? prev + 2 : prev - 2;
                })
              }
            >
              {limit < blogs.data?.length ? "More..." : "Less..."}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
