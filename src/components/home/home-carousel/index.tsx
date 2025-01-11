import { APIResponseCollection } from "@/types/types";
import SliderComponent from "./slider-component";
const getPackages = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?populate[image][populate]=true&populate[adventure_specification][populate]=*&pagination[pageSize]=10&pagination[page]=1&fields[0]=package_name`,
    );
    const data: APIResponseCollection<"api::package.package"> =
      await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching", error);
  }
};
export default async function HomeCarousel() {
  const data = await getPackages();
  return <SliderComponent data={data} />;
}
