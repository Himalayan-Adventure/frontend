"use server";

import { axiosInstance } from "@/lib/server-axios-instance";
import { AdminUser } from "@/types/contentTypes";
import { TImage } from "@/types/strapi/image";
import {
  APIResponse,
  APIResponseCollection,
  APIResponseData,
} from "@/types/types";
import { type AxiosError } from "axios";
import { Attributes } from "react";

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
    const res = await axiosInstance.get("api/users" + filter);
    const data: TUser[] = res.data;

    return data;
  } catch (error: AxiosError | any) {
    console.log(error);
  }
};
