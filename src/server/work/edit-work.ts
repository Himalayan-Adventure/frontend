"use client";

import axios, { AxiosResponse, type AxiosError } from "axios";
import { uploadMedia } from "../media/add-media";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";
import { TWorkForm, WorkFormSchema } from "@/validators/work-validator";
export const editWork = async (work: TWorkForm, id: number) => {
  try {
    const validatedFields = WorkFormSchema.safeParse(work);

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

    const uploadThumbnail = await uploadMedia(work.image);
    if (!uploadThumbnail) {
      return {
        error: {
          message: "Failed to upload image!",
        },
        status: 500,
      };
    }
    const data = { ...work, image: uploadThumbnail };
    const res = await axios({
      method: "PUT",
      url: `/api/works/${id}`,
      data: data,
      withCredentials: true,
    });

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    const errorMsg =
      error?.response?.data?.error?.message ||
      "Error" + " | " + error?.response?.data?.error?.path?.[0] ||
      "An error occured";
    toast.error(errorMsg);
    return {
      error: {
        message: errorMsg,
      },
      status: error?.response?.status || 500,
    };
  }
};
