import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { PlusIcon, Shapes } from "lucide-react";

export default function BlogPage() {
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
        <Button className="bg-black text-sm text-white">
          <PlusIcon size={16} />
          Create
        </Button>
      </span>

      {/* Filters*/}
      <span className="flex gap-x-4">
        <Button
          variant="ghost"
          className="gap-x-2 rounded-full border border-gray-200"
        >
          <Shapes size={18} />
          Categories
        </Button>
        <div className="">
          <Input
            placeholder="Search blogs"
            className="w-full max-w-80 rounded-full"
          />
        </div>
      </span>

      {/* Blogs */}
      <div className="flex flex-col space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {blogs?.map((blog) => (
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
