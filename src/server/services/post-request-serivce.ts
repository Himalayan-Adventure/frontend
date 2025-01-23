"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const postRequestService = async ({
  serviceId,
  userId,
}: {
  serviceId: number;
  userId: number;
}) => {
  const cookieStore = cookies();
  const token = cookieStore?.get("jwt")?.value;
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
      url: "api/service-requests",
      data: {
        data: {
          services: [serviceId],
          users_permissions_users: [userId],
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      if (res.status === 403 || res.status === 401) {
        throw new Error("Not authenticated");
      }
      throw new Error("Couldn't send request");
    }
    revalidateTag("service-requests");

    return {
      data: res.data,
      status: res.status,
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: {
        message: error || "Error sending request",
      },
    };
  }
};
