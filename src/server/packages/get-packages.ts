"use server";

import { APIResponseCollection } from "@/types/types";
import { type AxiosError } from "axios";
import qs from "qs";

export const getPackages = async ({
  key,
  filter,
  operator,
  title,
  adventureType,
  limit,
  region,
  season,
  experience,
  level,
  height,
}: {
  key?: string;
  filter?: string;
  operator?: string;
  title?: string;
  limit?: number;
  adventureType?: string;
  region?: string;
  season?: string;
  experience?: string;
  level?: string;
  height?: string;
}) => {
  try {
    const queryGenerator = (key?: string, filter?: string, height?: string) => {
      let query = "";

      if (height) {
        switch (height) {
          case "under 2000m":
            query += `filters[adventure_specification][max_altitude][$lte]=2000&`;
            break;
          case "above 2000m":
            query += `filters[adventure_specification][max_altitude][$gte]=2000&`;
            break;
          case "above 7000m":
            query += `filters[adventure_specification][max_altitude][$gte]=7000&`;
            break;
          case "above 8000m":
            query += `filters[adventure_specification][max_altitude][$gte]=8000&`;
            break;
          default:
            break;
        }
      }

      if (key === "season") {
        query += `filters[adventure_specification][season][name][$eqi]=${filter}&`;
      } else if (key === "altitude") {
        query += `filters[adventure_specification][max_altitude][$gte]=${filter}&`;
      } else if (key === "fitness") {
        query += `filters[adventure_specification][fitness][name][$eqi]=${filter}&`;
      } else if (key === "grade") {
        query += `filters[adventure_specification][grade][id][$eqi]=${filter}&`;
      } else if (key === "region") {
        query += `filters[package_region][id]=${filter}&`;
      } else if (key === "category") {
        query += `filters[package_categories][id]=${filter}&`;
      }

      return query;
    };

    const query = queryGenerator(key, filter, height);

    const additionalQuery = qs.stringify({
      filters: {
        ...(title ? { package_name: { $containsi: title } } : {}),
        ...(adventureType
          ? {
              package_types: {
                name: { $eqi: adventureType },
              },
            }
          : {}),
        ...(region
          ? {
              package_region: {
                name: { $eqi: region },
              },
            }
          : {}),
        ...(season
          ? {
              adventure_specification: {
                season: {
                  name: { $eqi: season },
                },
              },
            }
          : {}),
        ...(experience
          ? {
              adventure_specification: {
                grade: {
                  name: { $containsi: experience },
                },
              },
            }
          : {}),
        ...(level
          ? {
              adventure_specification: {
                skill_level: {
                  name: { $containsi: level },
                },
              },
            }
          : {}),
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
  } catch (error: AxiosError | any) {}
};
