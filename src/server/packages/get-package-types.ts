import { APIResponseCollection } from "@/types/types";

export async function getPackageTypes({ isPopular }: { isPopular?: boolean }) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("populate[packages][fields][0]", "package_name");

    if (isPopular) {
      searchParams.append("filters[is_popular]", "true");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-types?populate[packages][limit]=6&${searchParams.toString()}`,
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
