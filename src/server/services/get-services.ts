"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
import qs from "qs";
export const getServices = async ({
  category,
  name,
}: {
  category?: string;
  name?: string;
}) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          title: {
            $containsi: name,
          },
          categories: {
            name: {
              $eqi: category,
            },
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    console.log("query", query);
    const res: AxiosResponse<APIResponseCollection<"api::service.service">> =
      await axiosInstance.get(
        `api/services?populate[0]=image&populate[1]=service_provider&${query}`,
      );

    return res.data.data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
