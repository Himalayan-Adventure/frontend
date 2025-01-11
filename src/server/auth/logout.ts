"use server";

import { cookies } from "next/headers";

export async function logout() {
  cookies().delete({
    name: "jwt",
    httpOnly: true,
    path: "/",
    secure: true,
    domain: process.env.NEXT_PUBLIC_WEBSITE_URL,
  });
}
