"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { BlogFormSchema, TBlogForm } from "@/validators/blog-form";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
export const editBlog = async (data: TBlogForm, id: number) => {
  const cookieStore = cookies();
  try {
    const validatedFields = BlogFormSchema.safeParse(data);

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

    const payload = {
      title: data.title,
      thumbnail: data.image,
      description: data.description,
      categories: data.categories,
    };
    const res: AxiosResponse = await axiosInstance.put(`api/api/blogs/${id}`, {
      data: payload,
    });

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
