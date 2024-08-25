"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { TRegisterResponse } from "@/types/auth/";
import {
  RegisterPayloadSchema,
  type TRegisterPayload,
} from "@/validators/register-validator";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
export const register = async (user: TRegisterPayload) => {
  const cookieStore = cookies();
  try {
    const validatedFields = RegisterPayloadSchema.safeParse(user);

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

    const res: AxiosResponse<TRegisterResponse> = await axiosInstance.post(
      "api/auth/local/register",
      {
        email: user.email,
        password: user.password,
        username: user.username,
        phone: user.phone,
      },
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
