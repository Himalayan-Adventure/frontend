"use client";
import React from "react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";

export default function BlogDetail({ blog }: any) {
  return (
    <section className="container relative py-8 lg:mt-32">
      <div className="">
        {/* ShadCN Badge */}
        <Badge className="mb-4 rounded-lg bg-black px-3 py-1 text-xs font-medium text-white md:text-sm">
          {blog?.data?.attributes?.blog_tags?.data?.[0]?.attributes?.name ||
            "Trekking"}
        </Badge>

        {/* Blog Title */}
        <h1 className="mb-4 text-xl font-bold text-gray-800 md:text-3xl lg:text-5xl">
          {blog?.data?.attributes?.title}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={blog?.data?.attributes?.author_image?.data?.attributes?.url}
              className="saturate-0"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-medium text-gray-600">
            {blog?.data?.attributes?.author_name || "Guest"}
          </p>
          <div>
            <p className="text-sm font-bold text-gray-400">
              {formatDate(blog?.data?.attributes?.createdAt)}
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="my-12">
          <Image
            src={blog?.data?.attributes?.thumbnail?.data?.attributes?.url}
            alt="Featured Image"
            width={800}
            height={450}
            className="max-h-[30rem] rounded-lg object-cover saturate-0"
            objectFit="cover"
            layout="responsive"
          />
        </div>

        {/* Blog Content */}
        <div className="blog-content leading-relaxed text-gray-700">
          {/* <p className="mb-4">{blog?.data?.attributes?.description}</p> */}
          <div data-color-mode="light" className="space-y-10 font-sourceSerif">
            <MDEditor.Markdown
              source={blog?.data?.attributes?.description}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
