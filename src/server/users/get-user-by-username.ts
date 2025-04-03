import { TUserDeep } from "@/types/auth";
import qs from "qs";
export const getSingleUserByUsername = async ({
  username,
  query,
}: {
  username: string;
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
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users?filters[username]=${username}&${query || params}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: [`public-user-${username}`],
        },
      },
    );
    const data: TUserDeep[] = await res.json();
    if (!data || data?.length === 0) {
      return null;
    }
    return data?.[0];
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
