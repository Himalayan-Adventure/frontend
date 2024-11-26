"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { LoginFormSchema, type TLoginForm } from "@/validators/login-validator";
import { AxiosResponse, type AxiosError } from "axios";
import { TLoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
export const login = async (user: TLoginForm) => {
  const cookieStore = cookies();
  try {
    const validatedFields = LoginFormSchema.safeParse(user);

    if (!validatedFields.success) {
      return {
        error: {
          message:
            validatedFields?.error?.errors?.[0]?.message ||
            "Please check your input fields!",
        },
        status: 400,
      };
    }
    console.log(user);

    const res: AxiosResponse<TLoginResponse> = await axiosInstance.post(
      "api/auth/local",
      {
        identifier: user.email,
        password: user.password,
      },
    );

    cookieStore.set({
      name: "jwt",
      value: res.data.jwt,
      httpOnly: true,
      path: "/",
      domain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
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
