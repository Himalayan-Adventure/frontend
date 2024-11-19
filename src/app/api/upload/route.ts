import { APIResponseCollection } from "@/types/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}api/upload`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
      next: {
        revalidate: 15,
        tags: ["upload"],
      },
    },
  );
  const data: APIResponseCollection<"plugin::upload.file"> = await res.json();

  if (!res.ok) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(data, { status: 201 });
}
