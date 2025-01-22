"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { ApiPackagePackage } from "@/types/contentTypes";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import qs from "qs";
import { AxiosResponse, type AxiosError } from "axios";
export const getSingleProject = async (id: string) => {
  try {
    const params = qs.stringify(
      {
        populate: {
          image: { populate: "*" },
          users: {
            populate: "*",
          },
          user_review: {
            populate: {
              user: {
                populate: {
                  profilePicutre: "*",
                  about: "*",
                },
              },
            },
          },
          package: {
            populate: {
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
            },
          },
        },
      },

      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    const res: AxiosResponse<APIResponse<"api::project.project">> =
      await axiosInstance.get(`api/projects/${id}?${params}`);

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
