"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { AxiosResponse, type AxiosError } from "axios";
export const getProducts = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("api/shops?populate=*");

    return {
      data: res?.data?.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
