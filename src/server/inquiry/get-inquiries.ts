"use server";
import { APIResponseCollection } from "@/types/types";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import qs from "qs";
export const getInquiries = async ({
  id,
  page,
  date,
}: {
  id: number;
  page?: number;
  date?: string;
}) => {
  const cookieStore = cookies();
  try {
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          guide: {
            id: id,
          },
          createdAt: {
            $gte: date,
          },
        },

        pagination: {
          pageSize: 20,
          page: page,
        },
      },

      {
        encodeValuesOnly: true,
      },
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/inquiries?${query}`,
      {
        next: {
          tags: ["inquiries"],
        },
        headers: {
          Authorization: `Bearer ${cookieStore?.get("jwt")?.value}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data: APIResponseCollection<"api::inquiry.inquiry"> =
      await res.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
