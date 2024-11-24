"use client";

import {
  ServiceFormSchema,
  TServiceForm,
} from "@/validators/service-form-validator";
import axios, { type AxiosError } from "axios";
import { uploadMedia } from "../media/add-media";
import { toast } from "sonner";
export const addService = async (service: TServiceForm) => {
  try {
    const validatedFields = ServiceFormSchema.safeParse(service);

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
    const uploadThumbnail = await uploadMedia(service.image);
    if (!uploadThumbnail) {
      return {
        error: {
          message: "Failed to upload image!",
        },
        status: 500,
      };
    }

    const data = {
      ...service,
      image: uploadThumbnail,
    };

    const res = await axios({
      method: "POST",
      url: "/api/services",
      data: data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
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
