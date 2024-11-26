"use server";

import axios, { AxiosResponse, type AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const deleteBlog = async (id: number) => {
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
    revalidateTag("blogs");

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
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
