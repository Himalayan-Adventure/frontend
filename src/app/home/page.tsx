import Image from "next/image";
import bgImage from "/public/images/home-bg-1.png";
import cloudImage from "/public/images/cloud.png";
import lhotseImage from "/public/images/lhotse.png";
import climberImage from "/public/images/climber-bg.png";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-0 left-0 h-screen w-full overflow-hidden">
        <Image
          src={bgImage}
          alt="Home horizon image"
          className="absolute top-0 left-0 w-full h-screen"
        />
        <Image
          src={climberImage}
          alt="Climber Image"
          className="absolute bottom-10 w-auto h-[90vh] left-0"
        />
        <Image
          src={lhotseImage}
          alt="Lhoste Image"
          className="absolute h-screen w-auto bottom-0 right-0 object-cover"
        />
        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="absolute -bottom-10 h-[60vh] left-0"
        />
        Himalayan Adventures Home Page
      </div>
    </main>
  );
}
