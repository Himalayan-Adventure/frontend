"use server";

import axios, { AxiosError, AxiosResponse } from "axios";

export const getTeams = async () => {
  try {
    const res: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/team-categories?populate=*`,
    );

    return {
      data: res.data.data,
      status: res.status,
    };
  } catch (error: AxiosError | any) {
    return {
      error: error?.response?.data || { message: "An error occurred!" },
      status: error?.response?.status || 500,
    };
  }
};
