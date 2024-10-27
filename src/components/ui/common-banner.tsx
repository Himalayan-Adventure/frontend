import Image, { StaticImageData } from "next/image";
import fallbackImg from "/public/images/packageBanner.png";

interface CommonBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string | StaticImageData;
}

const CommonBanner: React.FC<CommonBannerProps> = ({
  title,
  subtitle,
  bgImage,
}) => {
  return (
    <section className="-z-10 min-h-60 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-full">
        <div className="relative">
          <Image
            src={bgImage || fallbackImg}
            alt="Background Image"
            objectFit="cover"
            quality={100}
            className="h-96 object-cover lg:h-auto"
          />
          <div className="container absolute inset-0 flex flex-col justify-center space-y-3 text-white lg:space-y-6">
            <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
              {title}
            </h1>
            <p className="max-w-xl text-sm md:text-[16px]">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonBanner;
