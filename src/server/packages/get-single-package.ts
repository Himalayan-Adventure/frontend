"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { ApiPackagePackage } from "@/types/contentTypes";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
export const getSinglePackage = async (id: number) => {
  try {
    const res: AxiosResponse<APIResponse<"api::package.package">> =
      await axiosInstance.get(`api/packages/${id}?populate=*`);

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
