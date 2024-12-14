"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { TUser } from "@/types/auth";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
import { cookies } from "next/headers";
import qs from "qs";
export const getAppointments = async ({
  user,
  page,
  date,
}: {
  user: TUser;
  page?: number;
  date?: string;
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  try {
    let filters = {};

    if (user.userType === "merchant") {
      filters = {
        guide: {
          id: {
            $eq: user.id,
          },
        },

        createdAt: {
          $gte: date,
        },
      };
    }
    const query = qs.stringify(
      {
        populate: "*",
        filters: filters,
        pagination: {
          pageSize: 25,
          page: page,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/appointments?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["appointments"],
        },
        cache: "no-store",
      },
    );
    const data: APIResponseCollection<"api::appointment.appointment"> =
      await res.json();

    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
