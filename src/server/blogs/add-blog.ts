"use client";

import { BlogFormSchema, TBlogForm } from "@/validators/blog-form";
import axios, { type AxiosError } from "axios";
import { uploadMedia } from "../media/add-media";
import { toast } from "sonner";
export const addBlog = async (blog: TBlogForm) => {
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
    };

    const res = await axios({
      method: "POST",
      url: "/api/blogs",
      data: data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
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
