import { BlogAddOrEditForm } from "../../add-or-edit-form";
import { getSingleBlog } from "@/server/blogs/get-single-blog";
import { Text } from "@/components/ui/text";
import { GoBackButton } from "@/components/profile/go-back-button";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Edit Blog`,
  description: ` ${siteConfig.siteName}`,
};

type Props = {
  params: {
    id: number;
  };
};
export default async function BlogEditPage({ params }: Props) {
  const { id } = params;
  const blog = await getSingleBlog(id.toString());
  if (!blog?.data?.data) {
    return (
      <section className="space-y-10">
        <GoBackButton />
        <Text variant="text-xl">No available blog</Text>
      </section>
    );
  }
  return (
    <section>
      {blog?.data && (
        <BlogAddOrEditForm type={"edit"} data={blog.data} id={id} />
      )}
    </section>
  );
}
