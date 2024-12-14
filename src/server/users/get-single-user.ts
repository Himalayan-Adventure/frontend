import { TUserDeep } from "@/types/auth";
import { cookies } from "next/headers";

export const getSingleUser = async (id: number) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("No token, Unauthorized");
  }

  try {
    const params = new URLSearchParams();
    params.set("populate", "deep");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${id}?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: [`user-${id}`],
        },
      },
    );
    const data: TUserDeep = await res.json();
    if (!data) {
      return null;
    }
    return data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
