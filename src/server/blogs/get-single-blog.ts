"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
export const getSingleBlog = async (id: string) => {
  try {
    const res: AxiosResponse<APIResponse<"api::blog.blog">> =
      await axiosInstance.get(`api/blogs/${id}?populate=*`);

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
