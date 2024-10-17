import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
export const BlogCards = () => {
  const [limit, setLimit] = useState(6);
  function createBlogs(numBlogs: number) {
    const blogs = [];

    for (let i = 1; i <= numBlogs; i++) {
      blogs.push({
        title: `Blog Title  ${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
        slug: `blog-title-${i}`,
        tags: ["lorem ipsum"],
        author_name: `Author ${i}`,
        createdAt: `August ${20 + i}, 2023`,
        thumbNail:
          "https://fastly.picsum.photos/id/764/1000/750.jpg?hmac=Je4D-wCU3q0Rm_b0noAdu-8_mD1xeZIizwuI7iT8a-w",
      });
    }

    return blogs;
  }

  const blogs = createBlogs(10);
  return (
    <div className="rounded-xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Blog</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>

        {/* Blogs */}
        <div className="flex flex-col space-y-8">
          <div className="grid w-full gap-4 md:grid-cols-2">
            {blogs
              .slice(0, limit)
              ?.map((blog) => (
                <BlogCard
                  blog={blog}
                  key={`blog-${blog.title}-${blog.author_name}`}
                />
              ))}
          </div>
          <Button
            className="self-center bg-foreground px-8 py-4"
            onClick={() =>
              setLimit((prev) => {
                return limit < blogs.length ? prev + 2 : prev - 2;
              })
            }
          >
            {limit < blogs.length ? "More..." : "Less..."}
          </Button>
        </div>
      </div>
    </div>
  );
};
