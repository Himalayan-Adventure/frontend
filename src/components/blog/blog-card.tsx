"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link2, Pencil, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { deleteBlog } from "@/server/blogs/delete-blog";
import { toast } from "sonner";
import useUpdateQueryString from "@/hooks/use-update-query-string";

export default function BlogCard({
  blog,
  variant,
}: {
  blog: APIResponseData<"api::blog.blog">;
  variant?: "default" | "edit";
}) {
  const slug = blog?.id;
  //prettier-ignore
  //@ts-ignore
  const image = blog?.attributes?.thumbnail?.data?.attributes.formats?.small || blog?.attributes?.thumbnail?.data;
  const avatar =
    blog?.attributes?.author_image?.data?.attributes ||
    blog?.attributes?.user?.data?.attributes?.profilePicture?.data?.attributes;
  const tags = blog?.attributes?.blog_categories?.data;
  const { mutate: deleteAction, isPending } = useMutation({
    mutationKey: ["blogs", blog.id],
    mutationFn: async () => await deleteBlog(blog.id),
    onSuccess(data, variables, context) {
      toast.success("Blog successfully deleted");
    },
  });
  const updateQueryString = useUpdateQueryString();

  return (
    <article className="group relative flex w-full flex-col items-start justify-center gap-y-4 rounded-xl border bg-white p-4 pb-2">
      {/*Overlay buttons for edit*/}
      {variant === "edit" && (
        <div className="invisible absolute inset-0 -z-20 flex w-full items-center justify-center gap-x-2 rounded-xl bg-black/40 transition-all ease-in-out group-hover:visible group-hover:z-20">
          <Link href={`/blog/${blog.id}`} target="_blank">
            <Button className="aspect-square h-auto bg-white text-green-400 hover:bg-green-400 hover:text-white">
              <Link2 size={24} />
            </Button>
          </Link>
          <Link href={`/dashboard/blog/edit/${blog.id}`}>
            <Button className="aspect-square h-auto bg-white text-blue-400 hover:bg-blue-400 hover:text-white">
              <Pencil size={24} />
            </Button>
          </Link>
          <Button
            onClick={() => deleteAction()}
            className="aspect-square h-auto bg-white text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash size={24} />
          </Button>
        </div>
      )}
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        className="h-[10rem] w-full self-stretch overflow-hidden rounded-sm bg-gray-200"
        prefetch={false}
      >
        <Image
          src={
            image?.url ||
            "https://plus.unsplash.com/premium_photo-1677002240252-af3f88114efc?q=80&w=2925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={blog?.attributes?.title || "Blog image"}
          width={image?.width || 600}
          height={image?.height || 400}
          className="h-full w-full rounded-xl object-cover saturate-0 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col items-start gap-2 self-stretch">
        {tags && tags.length > 0 && (
          <div className="items-center gap-4 self-start">
            {tags.map((tag) => (
              <Badge
                key={`tag-${tag.id}-${blog.id}`}
                onClick={() => {
                  updateQueryString({ categoryID: tag.id.toString() });
                }}
                className="flex cursor-pointer rounded-md bg-blue-50 !px-3 !py-1 text-center text-xs font-medium leading-6 text-blue-700 ring-0 transition ease-in-out hover:bg-blue-700 hover:text-white hover:underline"
              >
                {tag.attributes.name}
              </Badge>
            ))}
            <Text variant="text-sm" className="text-gray-500"></Text>
          </div>
        )}
        <Link
          href={`/blog/${slug}`}
          target="_blank"
          className="space-y-2.5 self-stretch underline-offset-1 hover:[&>h2]:underline"
          prefetch={false}
        >
          <Text
            as="h2"
            variant="text-lg"
            medium
            className="line-clamp-2 text-left text-base tracking-tight md:h-14 md:text-lg"
          >
            {blog?.attributes?.title}
          </Text>
        </Link>

        <div className="mt-4 flex items-center gap-2 self-stretch">
          {/*@ts-ignore*/}
          {avatar && (
            <Avatar className="size-6">
              <AvatarImage src={avatar.url} className="saturate-0" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}

          {/*@ts-ignore*/}
          {blog?.attributes?.author_name && (
            <>
              <Text variant="text-sm" className="line-clamp-1 text-gray-500">
                {/*@ts-ignore*/}
                {blog?.attributes?.author_name}
              </Text>

              <Text as="span" variant="text-md" className="text-gray-500" bold>
                ·
              </Text>
            </>
          )}
          {blog?.attributes?.createdAt?.toString() && (
            <Text variant="text-sm" className="line-clamp-1 text-gray-500">
              {formatDate(blog?.attributes?.createdAt?.toString())}
            </Text>
          )}
        </div>
      </div>
    </article>
  );
}
