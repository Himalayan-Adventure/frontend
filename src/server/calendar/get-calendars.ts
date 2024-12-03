"use server";
import { APIResponseCollection } from "@/types/types";
import { AxiosError } from "axios";
import qs from "qs";
export const getCalendars = async ({ available }: { available?: boolean }) => {
  try {
    const query = qs.stringify({
      populate: "*",
      filters: {
        is_available: available,
      },
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/calendars?${query}`,
      {
        next: {
          tags: ["calendars"],
        },
        cache: "no-store",
      },
    );
    const data: APIResponseCollection<"api::calendar.calendar"> =
      await res.json();

    return {
      data: data?.data ?? [],
      status: res?.status ?? 500,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return { data: [], status: 500 };
  }
};
