import Image from "next/image";
import bgImage from "/public/images/home-bg-1.png";
import cloudImage from "/public/images/cloud.png";
import lhotseImage from "/public/images/lhotse.png";
import climberImage from "/public/images/climber-bg.png";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { socialIcons } from "@/config/constants";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/*
        overlay images
      */}
      <div className="absolute left-0 top-0 h-[50vh] w-full overflow-hidden sm:h-screen">
        <Image
          src={bgImage}
          alt="Home horizon image"
          className="absolute left-0 top-0 h-screen w-full"
        />
        <Image
          src={climberImage}
          alt="Climber Image"
          className="absolute bottom-[15%] left-0 h-1/2 w-auto object-contain mix-blend-color-dodge sm:bottom-10 sm:h-[90vh]"
        />
        <Image
          src={lhotseImage}
          alt="Lhoste Image"
          className="absolute bottom-10 right-0 h-full w-auto object-cover md:bottom-0 md:h-screen md:w-full"
        />
        <Image
          src={cloudImage}
          alt="Cloud Image"
          className="absolute bottom-0 left-0 h-1/2 object-cover md:-bottom-10 md:h-[60vh]"
        />
      </div>

      {/*
        Social icons
      */}
      <aside className="absolute right-2 top-1/2 hidden h-screen -translate-y-1/2 flex-col justify-center gap-y-2 lg:flex">
        {socialIcons.map((item) => (
          <Link
            key={`social-link-${item.name}`}
            href={item.href}
            target="_blank"
          >
            <Image
              src={item.icon}
              alt={`${item.name} Icon`}
              className="h-auto w-12"
            />
          </Link>
        ))}
      </aside>
      <header className="relative top-[calc(var(--navbar-height)+2em)] z-10 flex flex-col items-center gap-y-10 text-white">
        <Text
          variant="display-lg"
          className="text-lg font-black capitalize tracking-wide md:text-2xl lg:text-4xl 2xl:text-[50px]"
        >
          Not sure where to go? Perfect.
        </Text>
        <Button className="flex items-center gap-x-4 rounded-full border border-white bg-transparent px-6 py-6 text-white md:px-10 md:py-8">
          <Search />
          <Text variant="text-md" bold>
            Find your Adventure
          </Text>
        </Button>
      </header>
    </main>
  );
}
