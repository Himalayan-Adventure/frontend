import { APIResponseCollection } from "@/types/types";

export async function getPackageCategories({
  isPopular,
}: {
  isPopular?: boolean;
}) {
  try {
    const searchParams = new URLSearchParams();
    //searchParams.append("populate", "*");
    searchParams.append("populate[packages][fields][0]", "package_name");

    if (isPopular) {
      searchParams.append("filters[is_popular]", "true");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/package-categories?populate[packages][limit]=6&${searchParams.toString()}`,
    );
    if (!res.ok) {
      throw new Error("Error fetching package categories");
    }
    const data: APIResponseCollection<"api::package-category.package-category"> =
      await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
