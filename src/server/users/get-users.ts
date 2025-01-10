"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { AdminUser } from "@/types/contentTypes";
import qs from "qs";
import { TImage } from "@/types/strapi/image";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { type AxiosError } from "axios";
import QueryString from "qs";
import { Attributes } from "react";
import { TUserDeep } from "@/types/auth";

type TUser = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  userType: "merchant" | "customer";
  profilePicture: TImage;
};
type UserObject =
  APIResponseData<"plugin::users-permissions.role">["attributes"];
export const getUsers = async (
  type?: "merchant" | "customer",
  name?: string,
  limit?: number,
  filter?: string,
) => {
  try {
    // const filter = type
    //   ? `?filters[userType][$eqi]=${type}&populate[0]=profilePicture`
    //   : "";

    const params = new URLSearchParams();
    if (type) {
      params.set("filters[userType][$eqi]", type);
      params.set("populate[0]", "profilePicture");
    }
    if (limit) {
      params.set("pagination[pageSize]", limit.toString());
      params.set("pagination[page]", "1");
    }

    if (name) {
      params.set("filters[username][$contains]", name);
    }
    const res = await axiosInstance.get(
      `api/users?${params.toString()}${filter && "&" + filter}`,
    );
    return res.data as TUser[];
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};

export const getUsersDeep = async (
  type?: "merchant" | "customer",
  name?: string,
) => {
  try {
    const filter = type
      ? `?filters[userType][$eqi]=${type}&populate[0]=profilePicture`
      : "";
    const params = new URLSearchParams();
    if (type) {
      params.set("filters[userType][$eqi]", type);
      params.set("populate[0]", "profilePicture");
    }
    if (name) {
      params.set("filters[username][$contains]", name);
    }
    params.set("populate", "deep");

    const res = await axiosInstance.get(`api/users?${params.toString()}`);
    return res.data as TUserDeep[];
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
