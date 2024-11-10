import CommonBanner from "@/components/ui/common-banner";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default async function BlogDetailPage() {
  const blogPost = {
    title: "Lorem Ipsum",
    author: {
      name: "John Doe",
      avatar: "/path/to/avatar.jpg",
    },
    createdDate: "November 6, 2024",
    image:
      "https://plus.unsplash.com/premium_photo-1677002240252-af3f88114efc?q=80&w=2925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat.",
    category: "Trekking Equipments",
  };

  return (
    <main>
      <CommonBanner title="Lorem Ipsum" />
      <section className="container relative py-8 lg:mt-32">
        <div className="">
          {/* ShadCN Badge */}
          <Badge className="mb-4 rounded-lg bg-black px-3 py-1 text-xs font-medium text-white md:text-sm">
            {blogPost.category}
          </Badge>

          {/* Blog Title */}
          <h1 className="mb-4 text-xl font-bold text-gray-800 md:text-3xl lg:text-5xl">
            {blogPost.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="saturate-0"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium text-gray-600">{blogPost.author.name}</p>
            <div>
              <p className="text-sm text-gray-400">{blogPost.createdDate}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="my-12">
            <Image
              src={blogPost.image}
              alt="Featured Image"
              width={800}
              height={450}
              className="max-h-[30rem] rounded-lg object-cover"
              objectFit="cover"
              layout="responsive"
            />
          </div>

          {/* Blog Content */}
          <div className="leading-relaxed text-gray-700">
            <p className="mb-4">{blogPost?.content}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
