"use server";

import "server-only";

import { TUserDeep, type TUser } from "@/types/auth";

/**
 * Get the current user's data.
 */
import { axiosInstance } from "@/lib/server-axios-instance";
import { LoginFormSchema, type TLoginForm } from "@/validators/login-validator";
import axios, { AxiosResponse, type AxiosError } from "axios";
import { TLoginResponse } from "@/types/auth";
import { cookies } from "next/headers";
// export const getMe = async () => {
//   const cookieStore = cookies();
//   try {
//     const res: AxiosResponse= await axiosInstance.post(
//       "api/auth/local",
//     );

//     cookieStore.set({
//       name: "jwt",
//       value: res.data.jwt,
//       httpOnly: true,
//       path: "/",
//       domain: process.env.NODE_ENV === "development" ? `localhost` : "/",
//     });
//     return {
//       data: res.data,
//       status: res.status,
//     };
//   } catch (error: AxiosError | any) {
//     return {
//       error: error?.response?.data || { message: "An error occurred!" },
//       status: error?.response?.status || 500,
//     };
//   }
// };

// export async function getMe() {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("jwt")?.value;

//     if (!token) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         next: {
//           revalidate: 15,
//           tags: ["me"],
//         },
//       },
//     );

//     if (!res.ok) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await res.json();

//     return Response.json(user);
//   } catch (error) {
//     console.log(error);
//   }
// }

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

// const getUser = async () => {
//   try {
//     const res = await axios.get<TUserDeep>("/api/me?populate=deep");

//     if (!res?.data) {
//       return null;
//     }
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching user data", error);
//     return null;
//   }
// };
