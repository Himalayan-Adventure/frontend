"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { TRegisterResponse } from "@/types/auth/";
import { BlogFormSchema, TBlogForm } from "@/validators/blog-form";
import {
  RegisterPayloadSchema,
  type TRegisterPayload,
} from "@/validators/register-validator";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
export const addBlog = async (data: TBlogForm) => {
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
    const res: AxiosResponse = await axiosInstance.post("api/api/blogs", {
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
