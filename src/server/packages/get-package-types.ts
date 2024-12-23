import { APIResponseCollection } from "@/types/types";

export async function getPackageTypes() {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("populate[packages][fields][0]","package_name")
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-types?${searchParams.toString()}`,
    );
    if (!res.ok) {
      throw new Error("Error fetching package types");
    }
    const data: APIResponseCollection<"api::package-type.package-type"> =
      await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
