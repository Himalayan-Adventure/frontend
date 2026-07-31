"use client";

import { useState } from "react";
import { ApiBlogBlog, ApiBlogCategoryBlogCategory } from "@/types/contentTypes";
import BlogCard from "./blog-card";
import BlogFilterBar from "./blog-filter";

export default function BlogsList({
  blogs,
  categories,
}: {
  blogs: any;
  categories: any;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog: any) => {
    const matchesCategory =
      selectedCategory === "Categories" ||
      blog?.blog_categories?.[0]?.name ===
        selectedCategory;
    const matchesSearchQuery =
      searchQuery === "" ||
      blog?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      blog?.content
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <section className="container">
      <BlogFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-16">
        {filteredBlogs?.length > 0 ? (
          filteredBlogs.map((blog: any, index: number) => (
            <BlogCard variant="default" blog={blog} key={index} />
          ))
        ) : (
          <p className="relative z-50 col-span-full text-center text-xl">
            No blogs found.
          </p>
        )}
      </div>
    </section>
  );
}
