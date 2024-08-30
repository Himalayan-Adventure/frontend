import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/packageBanner.png";
import { packages } from "@/data/packagesData";

interface Params {
  slug: string;
}

export default async function PackageDetail({ params }: { params: Params }) {
  const { slug } = params;
  const packg = packages.find((pkg) => pkg?.id === Number(slug));

  // const packageData = await fetchPackageData(slug);

  return (
    <main>
      <CommonBanner title={packg?.title || "Package"} bgImage={bgImage} />
      <section className="container">
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2"></div>
          <div className="lg:col-span-1"></div>
        </div>
      </section>
    </main>
  );
}
