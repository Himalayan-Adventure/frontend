"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
export const getSingleBlog = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs/${id}?populate=*`,
      {
        next: {
          tags: [`blog-${id}`],
        },
      },
    );
    const data: APIResponse<"api::blog.blog"> = await res.json();

    return {
      data: data,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
  }
};
