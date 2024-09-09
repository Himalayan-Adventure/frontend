import About from "@/components/packagespage/about";
import Departure from "@/components/packagespage/departure";
import Facts from "@/components/packagespage/facts";
import Faqs from "@/components/packagespage/faqs";
import Gallery, { GalleryImageProp } from "@/components/packagespage/gallery";
import Image from "next/image";
import HostedBy from "@/components/packagespage/hosted-by";
import InfoTabs from "@/components/packagespage/info-tabs";
import Itenerary from "@/components/packagespage/itenerary";
import Map from "@/components/packagespage/map";
import Offers from "@/components/packagespage/offers";
import Reviews from "@/components/packagespage/reviews";
import SimilarPackages from "@/components/packagespage/similar-packages";
import ThingsToKnow from "@/components/packagespage/things-to-know";
import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/packageBanner.png";
import { getSinglePackage } from "@/server/packages/get-single-package";
import { TDepartureData } from "@/types/packages/departure";
import HostInfo from "@/components/packagespage/host-info";
import { FaFlag } from "react-icons/fa";
import Link from "next/link";

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
    date: pkg?.date as string,
    departure: pkg?.departure as string,
    grade: pkg?.grade || "",
    altitude: pkg?.altitude || "",
    duration: pkg?.duration || "",
    season: pkg?.season || "",
  };
  if (!pkg) {
    return <CommonBanner title={`Package not found`} bgImage={bgImage} />;
  }

  return (
    <main>
      <CommonBanner title={`Package ${pkg.name}`} bgImage={bgImage} />
      <section className="container overflow-hidden">
        <div className="grid gap-x-4 space-y-8 md:gap-x-8 lg:grid-cols-3 lg:gap-x-24 lg:space-y-0">
          <div className="relative space-y-8 lg:col-span-2">
            <Gallery images={images} />

            <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
              <div className="space-y-2">
                <h1 className="text-sm md:text-lg">
                  Package Hosted by {pkg.hostname}
                </h1>
                <div className="flex flex-col gap-4 text-base md:flex-row md:items-center md:gap-8 lg:gap-12">
                  <h2>5 Climbers Booked</h2>
                  <ul className="flex list-disc space-x-8 text-sm md:text-base">
                    <li>2 leaders</li>
                    <li>Fixed Departure</li>
                    <li>Season: Autumn</li>
                  </ul>
                </div>
              </div>
              <div>
                {/* Host Logo  */}
                <p className="sr-only">{pkg.hostname}</p>
                {pkg?.host && (
                  <Image
                    src={pkg?.host?.data?.attributes?.url}
                    alt="host logo"
                    priority
                    className="w-28 md:w-40"
                    width={pkg?.host?.data?.attributes?.width}
                    height={pkg?.host?.data?.attributes?.height}
                  />
                )}
              </div>
            </div>
            <About desc={pkg?.description} />
            <Itenerary />
            <InfoTabs />
          </div>
          <div className="space-y-8 lg:col-span-1">
            <Map location={pkg.name} />
            {/* Dpeparture*/}
            <Departure type={"default"} data={departureData} />
          </div>
        </div>
      </section>
      <Facts />
      {pkg.faq && (
        <Faqs
          data={pkg?.faq.map((i, index) => ({
            id: `${index}-faq-${pkg?.faq?.id}`,
            answer: i.answer || "",
            question: i.question || "",
          }))}
        />
      )}
      <Offers />
      <Reviews />
      <SimilarPackages />
      <HostInfo />
      <ThingsToKnow />
    </main>
  );
}
