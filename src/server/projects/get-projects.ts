"use server";

import { APIResponseCollection, APIResponseData } from "@/types/types";

import qs from "qs";
import { AxiosResponse, type AxiosError } from "axios";
export const getProjects = async ({
  key,
  filter,
  operator,
  limit,
  title,
}: {
  key?: string;
  filter?: string;
  operator?: string;

  title?: string;
  limit?: number;
}) => {
  try {
    // const queryGenerator = (key?: string, filter?: string) => {
    //   if (key === "season") {
    //     return `filters[adventure_specification][season][name][$eqi]=${filter}`;
    //   } else if (key === "altitude") {
    //     return `filters[adventure_specification][max_altitude][$gte]=${filter}`;
    //   } else if (key === "type") {
    //   } else if (key === "fitness") {
    //     return `filters[adventure_specification][fitness][name][$eqi]=${filter}`;
    //   } else if (key === "grade") {
    //     return `filters[adventure_specification][grade][id][$eqi]=${filter}`;
    //   } else if (key === "") {
    //   } else {
    //     return "";
    //   }
    // };
    // const query = queryGenerator(key, filter);
    const additionalQuery = qs.stringify({
      filters: {
        title: {
          $containsi: title,
        },
      },
      pagination: {
        pageSize: limit || 20,
        page: 1,
      },
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/projects?fields[0]=title&fields[1]=date&fields[2]=about_work&populate[package][populate][0]=image&populate[package][populate][1]=adventure_specification&${additionalQuery}`,
      {
        next: {
          tags: ["projects"],
        },
        cache: "no-cache",
      },
    );
    const data: APIResponseCollection<"api::project.project"> =
      await res.json();
    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
