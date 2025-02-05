"use server";

import "server-only";

import { TUserDeep, type TUser } from "@/types/auth";

import { cookies } from "next/headers";

export async function getUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["me"],
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: TUser = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getCurrentUserData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me?populate[0]=profilePicture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["me"],
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: TUser = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCurrentUserDataDeep() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me?populate=deep`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["me"],
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: TUserDeep = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCurrentUserProfilePageData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me?populate[0]=role&populate[1]=profilePicture&populate[2]=works&populate[3]=about&populate[4]=resume.education&populate[5]=contact&populate[6]=services&populate[7]=blogs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["me"],
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: TUserDeep = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
