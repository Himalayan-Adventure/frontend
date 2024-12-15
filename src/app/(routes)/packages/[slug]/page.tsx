import About from "@/components/packagespage/about";
import Departure from "@/components/packagespage/departure";
import Facts from "@/components/packagespage/facts";
import Faqs from "@/components/packagespage/faqs";
import Gallery, { GalleryImageProp } from "@/components/packagespage/gallery";
import HostInfo from "@/components/packagespage/host-info";
import InfoTabs, { InfoTabsProp } from "@/components/packagespage/info-tabs";
import Itenerary from "@/components/packagespage/itenerary";
import Map from "@/components/packagespage/map";
import Offers from "@/components/packagespage/offers";
import Reviews from "@/components/packagespage/reviews";
import SimilarPackages from "@/components/packagespage/similar-packages";
import ThingsToKnow from "@/components/packagespage/things-to-know";
import CommonBanner from "@/components/ui/common-banner";
import { getSinglePackage } from "@/server/packages/get-single-package";
import { CostBudgeting, TDepartureData } from "@/types/packages/departure";
import Image from "next/image";
import bgImage from "/public/images/packageBanner.png";
import Video from "@/components/packagespage/video";
import { Dot } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

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
  const departureData: TDepartureData = {
    //date: pkg?.date as string,
    departure: [
      {
        start: pkg?.adventure_specification?.travel_dates[0]?.date,
        end: pkg?.adventure_specification?.travel_dates[1]?.date,
      },
    ],
    grade: pkg?.adventure_specification?.grade?.[0]?.name || "",
    altitude: pkg?.adventure_specification?.max_altitude.toString() || "",
    duration: pkg?.adventure_specification?.duration || "",
    season: pkg?.adventure_specification?.season?.[0]?.name || "",
    cost_and_budgeting: (pkg?.cost_and_budgeting ?? []) as CostBudgeting[],
  };

  const infoTabsData: InfoTabsProp = {
    includes: pkg?.itinerary?.includes,
    excludes: pkg?.itinerary?.excludes,
  };

  const othersInfo = pkg?.itinerary?.others?.map(({ title, description }) => {
    return { title, description };
  });
  othersInfo?.forEach((i, index) => {
    infoTabsData[i.title] = {
      id: index,
      //title: i.title,
      description: i.description || [],
    };
  });
  if (!pkg) {
    return <CommonBanner title={`Package not found`} bgImage={bgImage} />;
  }
  return (
    <main className="font-poppins" id="pdfContent">
      <Image
        src={bgImage}
        alt="Background Image"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 h-96 w-full object-cover lg:h-auto"
      />

      <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
          {pkg?.package_name}
        </h1>
      </div>
      <section className="container overflow-hidden">
        <div className="grid gap-x-4 space-y-8 md:gap-x-8 lg:grid-cols-3 lg:gap-x-24 lg:space-y-0">
          <div className="relative space-y-8 lg:col-span-2">
            <Gallery images={images} />
            <div className="space-y-8 lg:col-span-1 lg:hidden">
              <Map location={pkg.package_name} />
              <Departure type="default" data={departureData} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
              <div className="space-y-2">
                {pkg?.package_host?.hostname && (
                  <h1 className="text-sm md:text-lg">
                    Package Hosted by {pkg?.package_host?.hostname}
                  </h1>
                )}

                <div className="flex flex-col gap-4 text-base md:flex-row md:items-center md:gap-8 lg:gap-12">
                  {/*
                  {pkg?.numberOfClimbers && (
                    <h2>{pkg.numberOfClimbers} Climbers Booked</h2>
                  )}
                  */}

                  <ul className="flex list-disc space-x-1 text-sm md:text-base">
                    {pkg.package_types?.data?.[0] && (
                      <h2>
                        {pkg?.package_types?.data?.[0]?.attributes?.name}{" "}
                      </h2>
                    )}

                    <Dot />
                    {/*
                    {pkg?.numberOfLeaders && (
                      <li>{pkg.numberOfLeaders} leaders</li>
                    )}
                    */}
                    <p>Fixed Departure</p>
                    <Dot />
                    {pkg?.adventure_specification?.season && (
                      <p className="capitalize">
                        Season:{" "}
                        {pkg?.adventure_specification?.season?.[0]?.name}
                      </p>
                    )}
                  </ul>
                </div>
              </div>
              <div>
                {/* Host Logo  */}
                <p className="sr-only">{pkg?.sponsor_host?.host_name} logo</p>
                {pkg?.package_host && (
                  <Image
                    src={
                      pkg?.package_host?.logo?.data?.attributes?.url ||
                      "/logo.png"
                    }
                    alt={"host logo" + pkg?.package_host?.hostname}
                    priority
                    className="max-h-20 w-28 object-contain md:w-40"
                    width={
                      pkg?.package_host?.logo?.data?.attributes?.width || 400
                    }
                    height={
                      pkg?.package_host?.logo?.data?.attributes?.height || 400
                    }
                  />
                )}
              </div>
            </div>
            <Separator className="h-px w-full bg-gray-400" />

            {pkg?.long_description && <About desc={pkg?.long_description} />}
            {pkg?.video && (
              <Video packageName={pkg?.package_name} videolink={pkg?.video} />
            )}
            {pkg?.itinerary?.timeline && (
              <Itenerary
                data={pkg?.itinerary?.timeline}
                packageName={pkg?.package_name}
              />
            )}
            <InfoTabs content={infoTabsData} />
          </div>
          <div className="hidden space-y-8 lg:col-span-1 lg:block">
            <Map location={pkg?.package_name} />
            <Departure type={"default"} data={departureData} />
          </div>
        </div>
      </section>
      {pkg?.trip_facts?.[0] && <Facts data={pkg?.trip_facts} />}
      {pkg.faq && (
        <Faqs
          data={pkg?.faq.map((i, index) => ({
            id: `${index}-faq-${pkg?.faq?.id}`,
            answer: i.answer || "",
            question: i.question || "",
          }))}
        />
      )}
      {pkg?.offer?.[0] && <Offers data={pkg?.offer?.[0]} />}
      <Reviews />
      <SimilarPackages />
      {pkg?.sponsor_host?.host_name && <HostInfo data={pkg?.sponsor_host} />}
      {pkg?.things_to_know && pkg?.things_to_know?.length > 0 && (
        <ThingsToKnow data={pkg?.things_to_know} />
      )}
    </main>
  );
}
