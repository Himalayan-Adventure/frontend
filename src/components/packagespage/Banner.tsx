import Image from "next/image";
import bgImage from "/public/images/packagesBanner.png";

export default function Banner() {
  return (
    <section className="-z-10 h-96 overflow-hidden lg:h-[60vh]">
      <div className="absolute left-0 top-0 h-full w-full">
        <Image
          src={bgImage}
          alt="Background Image"
          objectFit="cover"
          quality={100}
          className="lg:h-auto h-full object-cover"
        />
        <div className="container absolute inset-0 flex flex-col justify-center space-y-6 text-white">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
            Packages
          </h1>
          <p className="lg::text-3xl mt-4 max-w-xl text-lg md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            quis eius ipsa aspernatur minima quos delectus iusto inventore
            dolorum magni.
          </p>
        </div>
      </div>
    </section>
  );
}
