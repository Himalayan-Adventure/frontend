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
    // const params = 'populate[image][populate]=*&populate[package][populate][adventure_specification][populate]=*&populate[package][populate][sponsor_host][populate]=*&populate[package][populate][itinerary][populate]=*&populate[package][populate][logistics][populate]=*&populate[package][populate][trip_facts][populate]=*&populate[package][populate][offer][populate]=*&populate[package][populate][cost_and_budgeting][populate]=*&populate[package][populate][package_host][populate]=*&populate[package][populate][hosted_by][populate]=*&populate[package][populate][things_to_know][populate]=*&populate[package][populate][faq][populate]=*';
    console.log(params);
    const res: AxiosResponse<APIResponse<"api::project.project">> =
      await axiosInstance.get(`api/projects/${id}?${params}`);
    console.log(res.data);

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
