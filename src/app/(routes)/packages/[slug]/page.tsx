import About from "@/components/packagespage/about";
import Departure from "@/components/packagespage/departure";
import Facts from "@/components/packagespage/facts";
import Faqs from "@/components/packagespage/faqs";
import Gallery, { GalleryImageProp } from "@/components/packagespage/gallery";
import HostInfo from "@/components/packagespage/host-info";
import InfoTabs from "@/components/packagespage/info-tabs";
import Itenerary from "@/components/packagespage/itenerary";
import Map from "@/components/packagespage/map";
import Offers from "@/components/packagespage/offers";
import Reviews from "@/components/packagespage/reviews";
import SimilarPackages from "@/components/packagespage/similar-packages";
import ThingsToKnow from "@/components/packagespage/things-to-know";
import CommonBanner from "@/components/ui/common-banner";
import { getSinglePackage } from "@/server/packages/get-single-package";
import { TDepartureData } from "@/types/packages/departure";
import Image from "next/image";
import bgImage from "/public/images/packageBanner.png";
import Video from "@/components/packagespage/video";
import { FaFlag } from "react-icons/fa";
import Link from "next/link";
import { TInfoTabs } from "@/types/packages/info-tabs";
import { BlocksContent } from "@strapi/blocks-react-renderer";

interface Params {
  slug: string;
}

export default async function PackageDetail({ params }: { params: Params }) {
  const { slug } = params;
  const data = await getSinglePackage(slug);
  if (data.status === 404) {
    return (
      <div className="h-96">
        <CommonBanner title={`Package not found`} bgImage={bgImage} />
      </div>
    );
  }

  const pkg = data.data?.attributes;
  const images: GalleryImageProp[] | null = pkg?.image
    ? pkg?.image.data?.map((image) => ({
        src: image.attributes.url,
        alt: image.attributes?.alternativeText || image.attributes.name,
        height: image.attributes.height || 400,
        width: image.attributes?.width || 400,
      }))
    : [];
  // const departureData: TDepartureData = {
  //   date: pkg?.date as string,
  //   departure: pkg?.departure?.map(({ start, end }) => ({ start, end })),
  //   grade: pkg?.adventure_specification?.grade?.[0]?.name || "",
  //   altitude: pkg?.adventure_specification?.max_altitude || "",
  //   duration: pkg?.adventure_specification?.duration || "",
  //   season: pkg?.adventure_specification?.season?.[0]?.name || "",
  // };
  // const infoTabsData: Record<TInfoTabs, BlocksContent | undefined> = {
  //   includes: pkg?.itinerary?.includes,
  //   excludes: pkg?.excludedFacilities,
  //   gears: pkg?.gears,
  //   health: pkg?.healthAndSafety,
  // };
  // const thingsToKnowData = {
  //   cancellationPolicy: pkg?.cancellation,
  //   generalInfo: pkg?.expeditionGeneral,
  //   health: pkg?.healthSafety,
  // };
  
  
  if (!pkg) {
    return <CommonBanner title={`Package not found`} bgImage={bgImage} />;
  }
  return (
    <main>
      <CommonBanner title={`Package ${pkg.package_name}`} bgImage={bgImage} />
      <section className="container overflow-hidden">
        <div className="grid gap-x-4 space-y-8 md:gap-x-8 lg:grid-cols-3 lg:gap-x-24 lg:space-y-0">
          <div className="relative space-y-8 lg:col-span-2">
            <Gallery images={images} />
            <div className="space-y-8 lg:col-span-1 lg:hidden">
              <Map location={pkg.package_name} />
              {/* <Departure type={"default"} data={departureData} /> */}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
              <div className="space-y-2">
                {pkg?.sponsor_host?.host_name && (
                  <h1 className="text-sm md:text-lg">
                    Package Hosted by {pkg?.sponsor_host?.host_name}
                  </h1>
                )}

                <div className="flex flex-col gap-4 text-base md:flex-row md:items-center md:gap-8 lg:gap-12">
                  {/*
                  {pkg?.numberOfClimbers && (
                    <h2>{pkg.numberOfClimbers} Climbers Booked</h2>
                  )}
                  */}

                  <ul className="flex list-disc space-x-8 text-sm md:text-base">
                    {/*
                    {pkg?.numberOfLeaders && (
                      <li>{pkg.numberOfLeaders} leaders</li>
                    )}
                    */}
                    <li>Fixed Departure</li>
                    {pkg?.adventure_specification?.season && (
                      <li className="capitalize">
                        Season:{" "}
                        {pkg?.adventure_specification?.season?.[0]?.name}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div>
                {/* Host Logo  */}
                <p className="sr-only">{pkg?.sponsor_host?.host_name}</p>
                {pkg?.sponsor_host && (
                  <Image
                    src={
                      pkg?.sponsor_host?.logo?.data?.attributes?.url ||
                      "/logo.png"
                    }
                    alt="host logo"
                    priority
                    className="max-h-20 w-28 object-contain md:w-40"
                    width={
                      pkg?.sponsor_host?.logo?.data?.attributes?.width || 400
                    }
                    height={
                      pkg?.sponsor_host?.logo?.data?.attributes?.height || 400
                    }
                  />
                )}
              </div>
            </div>
            <About desc={pkg?.long_description} />
            {/*}<Video
              packageName={pkg?.name}
              videolink="https://www.youtube.com/embed/Mq9SubYm3zA?si=KbYeaXd9d29l82tr"
            />*/}
            {/*@ts-ignore */}
            {pkg?.itenary && <Itenerary data={pkg?.itenary} />}
            {/* <InfoTabs content={infoTabsData} /> */}
          </div>
          <div className="hidden space-y-8 lg:col-span-1 lg:block">
            <Map location={pkg?.package_name} />
            <Departure type={"default"} data={departureData} />
          </div>
        </div>
      </section>
      <Facts data={pkg?.trip_facts} />
      {pkg.faq && (
        <Faqs
          data={pkg?.faq.map((i, index) => ({
            id: `${index}-faq-${pkg?.faq?.id}`,
            answer: i.answer || "",
            question: i.question || "",
          }))}
        />
      )}
      {/* <Offers data={pkg.offer} /> */}
      <Reviews />
      <SimilarPackages />
      <HostInfo data={pkg?.sponsor_host} />
      <ThingsToKnow data={pkg?.things_to_know} />
    </main>
  );
}
