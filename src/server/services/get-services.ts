"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
import qs from "qs";
export const getServices = async ({
  id,
  category,
  name,
  page,
}: {
  id?: number;
  category?: string;
  name?: string;
  page?: number;
}) => {
  try {
    const query = qs.stringify(
      {
        filters: {
          service_provider: {
            id: {
              $eqi: id,
            },
          },
          title: {
            $containsi: name,
          },
          categories: {
            name: {
              $eqi: category,
            },
          },
        },

        pagination: {
          pageSize: 8,
          page: page,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/services?populate[0]=image&populate[1]=service_provider&populate[2]=categories&populate[3]=associated_packages&${query}`,
      {
        next: {
          tags: ["services"],
        },
        cache: "no-store",
      },
    );
    // const res: AxiosResponse<APIResponseCollection<"api::service.service">> =
    //   await axiosInstance.get(
    //     `api/services?populate[0]=image&populate[1]=service_provider&populate[2]=categories&populate[3]=associated_packages&${query}`,
    //   );
    const data: APIResponseCollection<"api::service.service"> =
      await res.json();

    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
