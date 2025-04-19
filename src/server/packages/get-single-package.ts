"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import {
  APIResponse
} from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";

import qs from "qs";
export const getSinglePackage = async (id: string) => {
  try {
    const params = qs.stringify(
      {
        populate: {
          image: { populate: "*" },
          adventure_specification: { populate: "*" },
          sponsor_host: { populate: "*" },
          itinerary: { populate: "*" },
          logistics: { populate: "*" },
          trip_facts: { populate: "*" },
          offer: { populate: "*" },
          cost_and_budgeting: { populate: "*" },
          package_host: { populate: "*" },
          hosted_by: { populate: "*" },
          things_to_know: { populate: "*" },
          faq: { populate: "*" },
          reviews: { populate: "*" },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );

    const res: AxiosResponse<APIResponse<"api::package.package">> =
      await axiosInstance.get(`api/packages/${id}?${params}`);

    return {
      data: res.data.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
