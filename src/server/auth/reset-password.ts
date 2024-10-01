"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import {
  ResetPasswordSchema,
  TResetPasswordInput,
} from "@/validators/reset-password";
import { AxiosResponse, type AxiosError } from "axios";
export const resetPassword = async (user: TResetPasswordInput) => {
  try {
    const validatedFields = ResetPasswordSchema.safeParse(user);

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

    const res: AxiosResponse<TResetPasswordInput> = await axiosInstance.post(
      "api/auth/reset-password",
      {
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
        code: user.code,
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
