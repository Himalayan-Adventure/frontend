import { axiosInstance } from "@/lib/server-axios-instance";
import { APIResponseCollection } from "@/types/types";
import { AxiosResponse, AxiosError } from "axios";
//import { cookies } from "next/headers";
import qs from "qs";

export const getWorksOfUser = async ({
  id,
  limit,
}: {
  id: number;
  limit?: number;
}) => {
  try {
    const query = qs.stringify(
      {
        pagination: {
          pageSize: limit || 5,
          page: 1,
        },
        filters: {
          user_works: {
            id,
          },
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      },
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/works?populate=*&${query}`,
      {
        next: {
          tags: ["works"],
        },
      },
    );
    const data: APIResponseCollection<"api::work.work"> = await res.json();
    return { data: data.data, meta: data.meta };
  } catch (error: any) {
    console.log(error);
    //    return { data: [], status: 500 };
  }
};
