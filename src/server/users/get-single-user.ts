import { TUserDeep } from "@/types/auth";
import qs from "qs";
export const getSingleUser = async ({
  id,
  query,
}: {
  id: number;
  query?: string;
}) => {
  try {
    const params = qs.stringify({
      populate: [
        "role",
        "profilePicture",
        "works",
        "about",
        "resume",
        "contact",
        "services",
        "blogs",
      ],
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${id}?${query || params}`,
      {
        headers: {
          "Content-Type": "application/json",
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
