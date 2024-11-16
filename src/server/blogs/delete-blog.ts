"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { BlogFormSchema, TBlogForm } from "@/validators/blog-form";
import { AxiosResponse, type AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const deleteBlog = async (id: number) => {
  const cookieStore = cookies();

  try {
    const res: AxiosResponse = await axiosInstance.delete(`/api/blogs/${id}`);
    revalidateTag("blogs");

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
