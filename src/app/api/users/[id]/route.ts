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
    const res = await fetch(
      // `populate=deep` came from strapi-plugin-populate-deep, which has no
      // Strapi v5 release — v5 rejects the unknown key, so populate explicitly.
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${id}?populate[0]=role&populate[1]=profilePicture&populate[2]=works&populate[3]=about&populate[4]=resume&populate[5]=contact&populate[6]=services&populate[7]=blogs`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(data),
        cache: "force-cache",
        // next: {
        //   tags: ["users"],
        // },
      },
    );

    const value = await res.json();
    if (!res.ok) {
      return Response.json(
        { error: value.error?.details?.errors?.[0] },
        { status: res.status },
      );
    }
    revalidateTag("me");
    revalidateTag(`user-${id}`);
    return Response.json({
      message: "Updated user",
      status: res.status,
      statusText: res.statusText,
      body: res.body,
      value: value,
    });
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
      // `populate=deep` came from strapi-plugin-populate-deep, which has no
      // Strapi v5 release — v5 rejects the unknown key, so populate explicitly.
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${id}?populate[0]=role&populate[1]=profilePicture&populate[2]=works&populate[3]=about&populate[4]=resume&populate[5]=contact&populate[6]=services&populate[7]=blogs`,

      {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
        },
        method: "GET",
        cache: "force-cache",
        next: {
          tags: [`user-${id}`],
        },
      },
    );

    const value = await res.json();
    return Response.json(value);
  } catch (error) {
    console.log("Error fetching user data");
  }
}
