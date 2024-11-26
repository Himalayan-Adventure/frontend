import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const id = (await params).id;
  const data = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return Response.json({ error: "No token, Unauthorized" }, { status: 401 });
  }

  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${id}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({ data }),
      cache: "no-cache",
      next: {
        tags: ["me"],
      },
    },
  );
  revalidateTag("me");

  const value = await res.json();
  if (!res.ok) {
    return Response.json(
      { error: value.error?.details?.errors?.[0] },
      { status: res.status },
    );
  }
  return Response.json(res);
}
