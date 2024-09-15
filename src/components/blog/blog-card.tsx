import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <article className="group flex w-full flex-col items-start justify-center gap-y-4 rounded-xl border p-4 pb-2">
      {/* xl:w-[24.5rem] */}
      <Link
        href={`/blog/${blog.slug}`}
        target="_blank"
        className="h-[10rem] w-full self-stretch overflow-hidden rounded-sm bg-gray-200"
        prefetch={false}
      >
        <Image
          src={blog?.thumbNail || "/images/fallback.jpg"}
          alt={blog?.title}
          width={600}
          height={400}
          className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 saturate-0"
        />
      </Link>

      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="items-center gap-4 self-start">
          <Badge className="flex rounded-md bg-blue-50 !px-3 !py-1 text-center text-xs font-medium leading-6 text-blue-700 ring-0">
            {blog?.tags[0]}
          </Badge>
          <Text variant="text-sm" className="text-gray-500"></Text>
        </div>
        <Link
          href={`/blog/${blog.slug}`}
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
            {blog?.title}
          </Text>
        </Link>

        <div className="flex items-center gap-2 self-stretch mt-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" className="saturate-0" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Text variant="text-sm" className="text-gray-500">
            {blog?.author_name}
          </Text>
          <Text as="span" variant="text-md" className="text-gray-500" bold>
            ·
          </Text>
          <Text variant="text-sm" className="text-gray-500">
            {blog?.createdAt}
          </Text>
        </div>
      </div>
    </article>
  );
}
