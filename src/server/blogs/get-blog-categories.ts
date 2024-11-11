"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { AxiosResponse, type AxiosError } from "axios";
export const getBlogCategories = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get(
      "api/blog-categories?populate=*",
    );
    return {
      data: res?.data?.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
