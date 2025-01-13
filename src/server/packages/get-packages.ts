"use server";

import { APIResponseCollection, APIResponseData } from "@/types/types";
import { AxiosResponse, type AxiosError } from "axios";
import qs from "qs";
export const getPackages = async ({
  key,
  filter,
  operator,
  title,
  limit,
}: {
  key?: string;
  filter?: string;
  operator?: string;
  title?: string;
  limit?: number;
}) => {
  try {
    const queryGenerator = (key?: string, filter?: string) => {
      if (key === "season") {
        return `filters[adventure_specification][season][name][$eqi]=${filter}`;
      } else if (key === "altitude") {
        return `filters[adventure_specification][max_altitude][$gte]=${filter}`;
      } else if (key === "type") {
      } else if (key === "fitness") {
        return `filters[adventure_specification][fitness][name][$eqi]=${filter}`;
      } else if (key === "grade") {
        return `filters[adventure_specification][grade][id][$eqi]=${filter}`;
      } else if (key === "region") {
        return `filters[package_region][id]=${filter}`;
      } else if (key === "category") {
        return `filters[package_categories][id]=${filter}`;
      } else {
        return "";
      }
    };
    const query = queryGenerator(key, filter);
    // for pagination and search
    const additionalQuery = qs.stringify({
      filters: {
        package_name: {
          $containsi: title,
        },
      },
      pagination: {
        pageSize: limit || 20,
        page: 1,
      },
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?fields[0]=package_name&populate[image][populate]0]=image&fields[2]=parent_title&populate[adventure_specification][populate][1]=travel_dates&populate[package_host][populate][3]=package_host&${query}&${additionalQuery}`,
      {
        next: {
          tags: ["packages"],
        },
        cache: "no-cache",
      },
    );
    const data: APIResponseCollection<"api::package.package"> =
      await res.json();
    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
