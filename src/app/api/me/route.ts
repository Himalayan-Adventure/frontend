import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;

  const populate = searchParams?.get("populate");
  const populateSingle = searchParams?.get("populate[0]");
  const params = new URLSearchParams();
  if (populate) {
    params.set("populate", populate);
  }
  if (populateSingle) {
    params.set("populate[0]", populateSingle);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["me"],
      },
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await res.json();
  return Response.json(user);
}
