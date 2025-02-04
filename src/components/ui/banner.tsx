import Image, { StaticImageData } from "next/image";
import cloudImage from "/public/images/cloud.png";

import fallbackBg from "/public/images/packageBanner.png";
export const Banner = ({
  title,
  bgImage,
  desc,
}: {
  title: string;
  bgImage?: string | StaticImageData;
  desc?: string;
}) => {
  return (
    <>
      <div className="absolute inset-0 h-[40vh] w-full lg:h-[80vh]">
        <Image
          src={bgImage || fallbackBg}
          alt="Background Image"
          objectFit="cover"
          quality={60}
          className="inset-0 h-full object-cover"
        />

        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="sm:mix-blend-light absolute -bottom-[45%] h-1/2 w-full object-cover md:-bottom-0 md:h-[40vh] lg:bottom-0 lg:h-auto lg:object-contain"
          unoptimized
        />
        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="sm:mix-blend-light absolute -bottom-[45%] h-1/2 w-full object-cover mix-blend-multiply md:bottom-0 md:h-[40vh]"
          unoptimized
        />
      </div>
      <div className="relative">
        <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 lg:space-y-6">
          <h1 className="text-2xl font-bold text-black md:text-4xl lg:text-[55px] lg:text-white">
            {title}
          </h1>
          {desc && (
            <p className="max-w-xl text-sm text-gray-600 md:text-[16px] lg:text-gray-200">
              {desc}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
