import Image, { StaticImageData } from "next/image";

interface CommonBannerProps {
  title: string;
  subtitle?: string;
  bgImage: string | StaticImageData;
}

const CommonBanner: React.FC<CommonBannerProps> = ({
  title,
  subtitle,
  bgImage,
}) => {
  return (
    <section className="-z-10 h-60 overflow-hidden lg:h-[60vh]">
      <div className="absolute left-0 top-0 h-full w-full">
        <Image
          src={bgImage}
          alt="Background Image"
          objectFit="cover"
          quality={100}
          className="h-96 object-cover lg:h-auto"
        />
        <div className="container absolute inset-0 flex flex-col justify-center space-y-3 lg:space-y-6 text-white">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px] -mt-52 lg:-mt-24">
            {title}
          </h1>
          <p className="max-w-xl text-sm md:text-[16px]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommonBanner;
