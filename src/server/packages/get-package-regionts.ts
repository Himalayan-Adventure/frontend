import { APIResponseCollection } from "@/types/types";

export async function getPackageRegions({isPopular}:{isPopular?: boolean}) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("populate", "*");
    if (isPopular) {
      searchParams.append("filters[is_popular]", "true");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-regions?${searchParams.toString()}`,
    );
    if (!res.ok) {
      throw new Error("Error fetching package region");
    }
    const data: APIResponseCollection<"api::package-region.package-region"> =
      await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
