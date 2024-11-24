"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
export const getServiceCategories = async () => {
  try {
    const res: AxiosResponse<
      APIResponseCollection<"api::service-category.service-category">
    > = await axiosInstance.get("api/service-categories");
    return {
      data: res?.data?.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
