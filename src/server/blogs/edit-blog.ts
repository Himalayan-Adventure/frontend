"use client";

import { BlogFormSchema, TBlogForm } from "@/validators/blog-form";
import axios, { AxiosResponse, type AxiosError } from "axios";
import { uploadMedia } from "../media/add-media";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";
export const editBlog = async (blog: TBlogForm, id: number) => {
  try {
    const validatedFields = BlogFormSchema.safeParse(blog);

    if (!validatedFields.success) {
      return {
        error: {
          message:
            validatedFields?.error?.errors?.[0]?.message ||
            "Please check your input fields!",
        },
        status: 400,
      };
    }

    const uploadThumbnail = await uploadMedia(blog.image);
    if (!uploadThumbnail) {
      return {
        error: {
          message: "Failed to upload image!",
        },
        status: 500,
      };
    }
    const data = {
      title: blog.title,
      thumbnail: uploadThumbnail,
      description: blog.description,
      blog_categories: blog.blog_categories,
      slug: blog.slug,
      user: blog.user,
    };

    const res = await axios({
      method: "PUT",
      url: `/api/blogs/${id}`,
      data: data,
      withCredentials: true,
    });

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    const errorMsg =
      error?.response?.data?.error?.message ||
      "Error" + " | " + error?.response?.data?.error?.path?.[0] ||
      "An error occured";
    toast.error(errorMsg);
    return {
      error: {
        message: errorMsg,
      },
      status: error?.response?.status || 500,
    };
  }
};
