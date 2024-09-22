import PackagesList from "@/components/packagespage/packages-list";
import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/packagesBanner.png";
import { Suspense } from "react";

export default function Packages() {
  return (
    <main>
      <CommonBanner
        title="Packages"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna "
        bgImage={bgImage}
      />
      <Suspense>
        <PackagesList />
      </Suspense>
    </main>
  );
}
