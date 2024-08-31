"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
export const getPackages = async () => {
  try {
    const res: AxiosResponse<APIResponseCollection<"api::package.package">> =
      await axiosInstance.get("api/packages?populate=*");

    return res.data.data;
  } catch (error: AxiosError | any) {
    console.log(error);
    // return {
    //   error: error?.response?.data || { message: "An error occurred!" },
    //   status: error?.response?.status || 500,
    // };
  }
};
