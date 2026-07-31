import { APIResponseCollection } from "@/types/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const apiToken =
      process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN;

    if (!jwt && !apiToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uploadToStrapi = (token: string) =>
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}api/upload`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
        next: {
          revalidate: 15,
          tags: ["upload"],
        },
      });

    let res = await uploadToStrapi(jwt || apiToken!);

    if (res.status === 401 && jwt && apiToken) {
      res = await uploadToStrapi(apiToken);
    }

    const data: APIResponseCollection<"plugin::upload.file"> | any =
      await res.json();

    if (!res.ok) {
      return Response.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to upload media" }, { status: 500 });
  }
}
