"use server";
import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection } from "@/types/types";
import axios, { AxiosResponse, AxiosError } from "axios";
import qs from "qs";

export const getBlogs = async ({ page }: { page?: number }) => {
  try {
    const query = qs.stringify(
      {
        pagination: {
          pageSize: 20,
          page: page || 1,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?populate=*&${query}`,
      {
        next: {
          tags: ["blogs"],
        },
      },
    );
    const data: APIResponseCollection<"api::blog.blog"> = await res.json();

    return {
      data: data?.data ?? [],
      meta: data.meta,
      status: res?.status ?? 500,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return { data: [], status: 500 };
  }
};
