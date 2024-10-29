import PackagesList from "@/components/packagespage/packages-list";
import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/packagesBanner.png";
import { Suspense } from "react";
import Image from "next/image";

export default function Packages() {
  return (
    <main>
      <Image
        src={bgImage}
        alt="Background Image"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 h-96 w-full object-cover lg:h-auto"
      />

      <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
          {"Packages"}
        </h1>

        <p className="max-w-xl text-sm md:text-[16px]">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna "
          }
        </p>
      </div>
      <Suspense>
        <PackagesList />
      </Suspense>
    </main>
  );
}
