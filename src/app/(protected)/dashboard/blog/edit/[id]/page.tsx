import { TWorkForm } from "@/validators/work-validator";
import { BlogAddOrEditForm } from "../../add-or-edit-form";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
import { getSingleBlog } from "@/server/blogs/get-single-blog";
import { TBlogForm } from "@/validators/blog-form";
import { Text } from "@/components/ui/text";

type Props = {
  params: {
    id: number;
  };
};
export default async function BlogEditPage({ params }: Props) {
  const { id } = params;
  const blog = await getSingleBlog(id.toString());
  if (!blog) {
    return (
      <section>
        <Text variant="text-xl">No available blog</Text>
      </section>
    );
  }
  console.log("hello", blog?.data?.data.attributes);
  const payload: TBlogForm = {
    title: blog?.data?.data?.attributes?.title || "",
    description: blog?.data?.data?.attributes?.description || "",
    image: blog?.data?.data?.attributes?.thumbnail?.data?.attributes?.url || "",
    categories:
      blog?.data?.data?.attributes?.blog_categories?.data?.[0]?.attributes
        ?.name,
  };
  return (
    <section>
      {blog && <BlogAddOrEditForm type={"edit"} data={payload} id={id} />}
    </section>
  );
}
