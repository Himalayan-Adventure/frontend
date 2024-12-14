"use server";
import { APIResponse } from "@/types/types";
import { AxiosError } from "axios";
import qs from "qs";
export const getSingleService = async (id: number) => {
  try {
    const query = qs.stringify({
      populate: "*",
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/services/${id}?${query}`,
      {
        next: {
          tags: ["services", `service-${id}`],
        },
        cache: "no-store",
      },
    );
    const data: APIResponse<"api::service.service"> = await res.json();

    return {
      data: data,
      status: res?.status,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
