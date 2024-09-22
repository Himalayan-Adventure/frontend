"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import {
  ForgotPwdEmailFormSchema,
  TForgotPwdEmailInput,
} from "@/validators/forgot-password";
import {
  RegisterPayloadSchema,
  type TRegisterPayload,
} from "@/validators/register-validator";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
export const forgotPassword= async (payload: TForgotPwdEmailInput) => {
  const cookieStore = cookies();
  try {
    const validatedFields = ForgotPwdEmailFormSchema.safeParse(payload);

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

    const res: AxiosResponse = await axiosInstance.post(
      "api/auth/auth/forgot-password",
      {
        email: payload.email,
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
