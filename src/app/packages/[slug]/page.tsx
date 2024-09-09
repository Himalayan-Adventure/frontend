import About from "@/components/packagespage/about";
import Departure from "@/components/packagespage/departure";
import Facts from "@/components/packagespage/facts";
import Faqs from "@/components/packagespage/faqs";
import Gallery from "@/components/packagespage/gallery";
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
import HostInfo from "@/components/packagespage/host-info";
import { FaFlag } from "react-icons/fa";
import Link from "next/link";

interface Params {
  slug: string;
}

export default async function PackageDetail({ params }: { params: Params }) {
  const { slug } = params;

  return (
    <main>
      <CommonBanner title={`Package ${slug}`} bgImage={bgImage} />
      <section className="container overflow-hidden">
        <div className="grid gap-x-4 space-y-8 md:gap-x-8 lg:grid-cols-3 lg:gap-x-24 lg:space-y-0">
          <div className="relative space-y-8 lg:col-span-2">
            <Gallery />
            <div className="space-y-8 lg:col-span-1 lg:hidden">
              <Map />
              <Departure />
              <div>
                <Link href="/report">
                  <p className="flex items-center justify-center space-x-1 text-center text-gray-500 underline">
                    <span>
                      <FaFlag />
                    </span>
                    <span>Report this listing</span>
                  </p>
                </Link>
              </div>
            </div>
            <HostedBy />
            <About />
            <Itenerary />
            <InfoTabs />
          </div>
          <div className="hidden space-y-8 lg:col-span-1 lg:block">
            <Map />
            <Departure />
            <div>
              <Link href="/report">
                <p className="flex items-center justify-center space-x-1 text-center text-gray-500 underline">
                  <span>
                    <FaFlag />
                  </span>
                  <span>Report this listing</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Facts />
      <Faqs />
      <Offers />
      <Reviews />
      <SimilarPackages />
      <HostInfo />
      <ThingsToKnow />
    </main>
  );
}
