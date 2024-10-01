"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { AxiosResponse, type AxiosError } from "axios";
export const confirmEmail = async (email: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.post(
      "api/auth/send-email-confirmation",
      {
        email: email,
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
