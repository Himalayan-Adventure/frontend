"use client";

import {
  EditProfileFormSchema,
  TEditProfileForm,
} from "@/validators/profile-edit-validator";
import axios, { AxiosResponse, type AxiosError } from "axios";
import { uploadMedia } from "../media/add-media";
export const updateUser = async (user: TEditProfileForm, id: number) => {
  try {
    const validatedFields = EditProfileFormSchema.safeParse(user);

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
    const uploadPfp = await uploadMedia(user.profile_picture);
    if (!uploadPfp) {
      return {
        error: {
          message: "Failed to upload pfp",
        },
        status: 500,
      };
    }
    const data = { ...user, profile_picture: uploadPfp };

    const res = await axios({
      method: "PUT",
      url: `/api/users/${id}`,
      data: data,
      withCredentials: true,
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
