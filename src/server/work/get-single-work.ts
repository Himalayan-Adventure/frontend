"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import axios, { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
export const getSingleWork = async (id: string) => {
  const cookieStore = cookies();
  try {
    const res: AxiosResponse<APIResponse<"api::work.work">> = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/works/${id}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("jwt")}`,
        },
      },
    );

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
