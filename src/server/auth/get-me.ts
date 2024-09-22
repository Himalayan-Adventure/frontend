"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { LoginFormSchema, type TLoginForm } from "@/validators/login-validator";
import { AxiosResponse, type AxiosError } from "axios";
import { TLoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
export const getMe = async () => {
  const cookieStore = cookies();
  try {
    const res: AxiosResponse= await axiosInstance.post(
      "api/auth/local",
    );

    cookieStore.set({
      name: "jwt",
      value: res.data.jwt,
      httpOnly: true,
      path: "/",
      domain: process.env.NODE_ENV === "development" ? `localhost` : "/",
    });
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
