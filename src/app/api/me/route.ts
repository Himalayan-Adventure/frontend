import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/me?populate=deep`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 15,
        tags: ["me"],
      },
    },
  );

  if (!res.ok) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await res.json();
  return Response.json(user);
}
