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
export const getUsers = async (type?: "merchant" | "customer") => {
  try {
    const filter = type
      ? `?filters[userType][$eqi]=${type}&populate[0]=profilePicture`
      : "";
    const params = new URLSearchParams();
    if (type) {
      params.set("filters[userType][$eqi]", type);
      params.set("populate[0]", "profilePicture");
    }

    const res = await axiosInstance.get(`api/users?${params.toString()}`);
    return res.data as TUser[];
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};

export const getUsersDeep = async (type?: "merchant" | "customer") => {
  try {
    const filter = type
      ? `?filters[userType][$eqi]=${type}&populate[0]=profilePicture`
      : "";
    const params = new URLSearchParams();
    if (type) {
      params.set("filters[userType][$eqi]", type);
      params.set("populate[0]", "profilePicture");
    }
    params.set("populate", "deep");

    const res = await axiosInstance.get(`api/users?${params.toString()}`);
    return res.data as TUserDeep[];
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
