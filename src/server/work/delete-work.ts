"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import axios, { AxiosResponse, type AxiosError } from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const deleteWork = async (id: number) => {
  const cookieStore = cookies();

  try {
    const res: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/works/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("jwt")?.value}`,
        },
      },
    );
    revalidateTag("works");

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
