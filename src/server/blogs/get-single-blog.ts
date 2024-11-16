"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import axios, { AxiosResponse, type AxiosError } from "axios";
export const getSingleBlog = async (id: string) => {
  try {
    const res: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs/${id}?populate=*`,
    );

    return {
      data: res.data.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
