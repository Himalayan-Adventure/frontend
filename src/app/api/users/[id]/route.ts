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

  try {
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
        cache: "no-store",
        next: {
          tags: ["me"],
        },
      },
    );
    revalidateTag("me");

    const value = await res.json();
    console.log(value, res.status, res.statusText);
    if (!res.ok) {
      return Response.json(
        { error: value.error?.details?.errors?.[0] },
        { status: res.status },
      );
    }
    return Response.json(res);
  } catch (error) {
    console.log("Error updating user data");
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const id = (await params).id;
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return Response.json({ error: "No token, Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${id}?populate=deep`,

      {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
        method: "GET",
        next: {
          tags: [`user-${id}`],
        },
      },
    );
    console.log(res);

    const value = await res.json();
    return Response.json(value);
  } catch (error) {
    console.log("Error fetching user data");
  }
}
