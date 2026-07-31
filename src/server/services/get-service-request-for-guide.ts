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
      // `populate[users_permissions_users][populate]=name` asked to populate a
      // scalar field; v5 rejects that with 400, so only populate relations here.
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/service-requests?populate[services][populate][0]=service_provider&populate[users_permissions_users][populate][0]=contact&${query}`,
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

export const getServiceRequestedByUser = async ({
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
          users_permissions_users: {
            id: id,
          },

          createdAt: {
            $gte: date,
          },
        },
        populate: {
          services: {
            populate: { [1]: "image" },
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
      // same here: `name` is a scalar, and the relation is `users_permissions_users`
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/service-requests?populate[services][populate][0]=service_provider&populate[users_permissions_users]=true&${query}`,
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
