import BlogCard from "@/components/blog/blog-card";
import { Text } from "@/components/ui/text";
import { CategoriesFilter } from "./categories-filter";
import { AddButton } from "./add-button";
import { Suspense } from "react";

export default function BlogPage({
  searchParams,
}: {
  searchParams: { code?: string; tag?: string };
}) {
  const { code, tag } = searchParams;
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
    <section className="space-y-8 font-poppins">
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Blogs
        </Text>

        <Suspense>
          <AddButton />
        </Suspense>
      </span>

      <Suspense>
        <CategoriesFilter />
      </Suspense>

      {/* Blogs */}

      <div className="flex flex-col space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {(code
            ? blogs.filter((i) => i.title.includes(code || ""))
            : blogs
          )?.map((blog) => (
            <BlogCard
              blog={blog}
              key={`blog-${blog.title}-${blog.author_name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
