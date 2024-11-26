"use server";
import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection } from "@/types/types";
import axios, { AxiosResponse, AxiosError } from "axios";

export const getBlogs = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?populate=*`,
      {
        next: {
          tags: ["blogs"],
        },
        cache: "no-store",
      },
    );
    const data: APIResponseCollection<"api::blog.blog"> = await res.json();
    // const res: AxiosResponse<APIResponseCollection<"api::blog.blog">> =
    //   await axiosInstance.get("api/blogs?populate=*");

    return {
      data: data?.data ?? [],
      status: res?.status ?? 500,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return { data: [], status: 500 };
  }
};
