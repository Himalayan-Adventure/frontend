"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
import qs from "qs";
export const getServiceRequests = async ({
  id,
  page,
  date,
  limit = 30,
}: {
  id?: number;
  page?: number;
  date?: string;
  limit?: number;
}) => {
  const cookieStore = cookies();
  try {
    const query = qs.stringify(
      {
        filters: {
          services: {
            service_provider: {
              id: {
                $eqi: id,
              },
            },
          },

          createdAt: {
            $gte: date,
          },
        },

        pagination: {
          pageSize: limit ? limit : 8,
          page: page,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/service-requests?populate[services][populate][0]=service_provider&populate[users_permissions_user][populate][1]=name&${query}`,
      {
        next: {
          tags: ["services-requests"],
        },

        headers: {
          Authorization: `Bearer ${cookieStore?.get("jwt")?.value}`,
        },
      },
    );
    const data: APIResponseCollection<"api::service-request.service-request"> =
      await res.json();

    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
