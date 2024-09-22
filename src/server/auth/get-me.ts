"use server";

import "server-only";

import { type TUser } from "@/types/auth";

/**
 * Get the current user's data.
 */
import { axiosInstance } from "@/lib/server-axios-instance";
import { LoginFormSchema, type TLoginForm } from "@/validators/login-validator";
import { AxiosResponse, type AxiosError } from "axios";
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
//       console.log(token);
//       console.log("hi");
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

export async function getCurrentUserData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}` || "",
        },
        next: {
          revalidate: 15,
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
