import Image from "next/image";
import bgImage from "/public/images/home-bg-1.png";
import cloudImage from "/public/images/cloud.png";
import lhotseImage from "/public/images/lhotse.png";
import climberImage from "/public/images/climber-bg.png";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute left-0 top-0 h-[50vh] w-full overflow-hidden md:h-screen">
        <Image
          src={bgImage}
          alt="Home horizon image"
          className="absolute left-0 top-0 h-screen w-full"
        />
        <Image
          src={climberImage}
          alt="Climber Image"
          className="absolute bottom-10 left-0 h-[90vh] w-auto object-contain mix-blend-color-dodge"
        />
        <Image
          src={lhotseImage}
          alt="Lhoste Image"
          className="absolute bottom-20 right-0 w-auto object-cover md:bottom-0 md:h-screen md:w-full"
        />
        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="absolute bottom-10 left-0 h-1/2 object-cover md:-bottom-10 md:h-[60vh]"
        />
        Himalayan Adventures Home Page
      </div>
    </main>
  );
}
