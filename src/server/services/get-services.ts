"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
export const getServices = async () => {
  try {
    const res: AxiosResponse<APIResponseCollection<"api::service.service">> =
      await axiosInstance.get("api/services?populate[0]=image&fields[0]=title");

    return res.data.data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
