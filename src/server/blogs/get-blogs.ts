import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection } from "@/types/types";
import { AxiosResponse, AxiosError } from "axios";

export const getBlogs = async () => {
  try {
    const res: AxiosResponse<APIResponseCollection<"api::blog.blog">> =
      await axiosInstance.get("api/blogs?populate=*");

    return {
      data: res?.data?.data ?? [],
      status: res?.status ?? 500,
    };
  } catch (error: AxiosError | any) {
    console.log(error);
    return { data: [], status: 500 };
  }
};
