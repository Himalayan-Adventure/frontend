"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
import qs from "qs";
export const getServices = async ({
  id,
  category,
  name,
  page,
  date,
  limit,
}: {
  id?: number;
  category?: string;
  name?: string;
  page?: number;
  date?: string;
  limit?: number;
}) => {
  const cookieStore = cookies();
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

          createdAt: {
            $gte: date,
          },
          categories: {
            name: {
              $eqi: category,
            },
          },
        },

        pagination: {
          pageSize: limit ? limit : 10,
          page: page || 1,
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

        // headers: {
        //   Authorization: `Bearer ${cookieStore?.get("jwt")?.value}`,
        // },
      },
    );
    const data: APIResponseCollection<"api::service.service"> =
      await res.json();

    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
