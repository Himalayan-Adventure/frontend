"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { ApiPackagePackage } from "@/types/contentTypes";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";

import qs from "qs";
export const getSinglePackage = async (id: string) => {
  try {
    const query = qs.stringify({});
    const res: AxiosResponse<APIResponse<"api::package.package">> =
      await axiosInstance.get(`api/packages/${id}?populate=deep`);

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
