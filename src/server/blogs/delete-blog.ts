"use server";

import axios, { AxiosResponse, type AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const deleteBlog = async (id: string) => {
  const cookieStore = cookies();

  try {
    const res: AxiosResponse = await axios(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookieStore.get("jwt")?.value}`,
        },
      },
    );

    // Strapi v5 answers a successful delete with 204 No Content
    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.statusText);
    }
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
