import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection } from "@/types/types";
import { AxiosResponse, AxiosError } from "axios";
import { cookies } from "next/headers";

export const getWorks = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt")?.value;

  // if (!token) {
  //
  //   return Response.json({ error: "No token, Unauthorized" }, { status: 401 });
  // }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/works?populate=deep`,
      {
        next: {
          tags: ["works"],
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
    const data: APIResponseCollection<"api::work.work"> = await res.json();
    return data;

    // return {
    //   data: data?.data ?? [],
    //   status: res?.status ?? 500,
    // };
  } catch (error: any) {
    console.log(error);
    return { data: [], status: 500 };
  }
};
