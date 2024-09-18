"use client";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AtSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  UserRound,
} from "lucide-react";
import { IoReorderTwoSharp as Menu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import User from "/public/images/user.png";
import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/packagesBanner.png";
import { socialIcons } from "@/config/constants";
import { useEffect, useRef, useState } from "react";
import { AboutCard } from "./about-card";
import { ResumeCard } from "./resume-card";
import { BlogCards } from "./blog";
import { ContactCard } from "./contact-card";
import { WorkCards } from "./work-card";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
export default function ProfilePage() {
  const [hideTabs, setHideTabs] = useState(false);
  const tabsTriggers = [
    {
      icon: <FaRegUser className="size-5 md:size-8" />,
      name: "about",
    },
    {
      icon: <FileText className="size-5 md:size-8" />,
      name: "resume",
    },
    {
      icon: <BsCardText className="size-5 md:size-8" />,
      name: "blog",
    },
    {
      name: "contact",
      icon: <AtSign className="size-5 md:size-8" />,
    },
    {
      name: "work",
      icon: <Briefcase className="size-5 md:size-8" />,
    },
  ];
  // For tabs overflow in mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const overflowDir = useOverflowDetection(containerRef);
  const [curScrollX, setCurScrollX] = useState(0);
  useEffect(() => {
    const scrollFn = (e: Event) => {
      setCurScrollX(containerRef?.current?.scrollLeft || 0);
    };
    containerRef?.current?.addEventListener("scroll", scrollFn);
    return () => containerRef?.current?.removeEventListener("scroll", scrollFn);
  }, []);
  return (
    <section className="container font-poppins">
      <CommonBanner title="Profile" bgImage={bgImage} />
      <Tabs
        defaultValue="about"
        className="relative z-10 flex flex-col items-stretch gap-x-10 gap-y-10 lg:flex-row"
      >
        <TabsList className="flex h-fit w-full flex-col items-stretch gap-x-10 gap-y-10 bg-transparent md:w-fit md:flex-row">
          <div className="relative w-full">
            {overflowDir === "left" || overflowDir === "both" ? (
              <div className="absolute left-0 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/40 shadow-lg shadow-white/10 lg:hidden">
                <ChevronLeft
                  className="animate-chevron-left absolute text-xl text-white"
                  onClick={() =>
                    containerRef?.current?.scroll({
                      top: 0,
                      left: curScrollX - 150,
                      behavior: "smooth",
                    })
                  }
                />
              </div>
            ) : null}
            <div className="flex items-stretch gap-2 md:h-fit md:flex-col md:gap-4 md:max-w-28">
              <Button
                className="rouned-2xl flex h-auto w-fit flex-col items-center gap-y-1 bg-white text-black shadow-2xl hover:bg-white hover:text-primary p-5 md:h-fit md:p-8 lg:p-6 md:w-full"
                onClick={() => setHideTabs(!hideTabs)}
              >
                <Menu className="size-5 md:size-10" />
              </Button>
              <div
                ref={containerRef}
                className={cn(
                  hideTabs ? "scale-y-0" : "scale-y-100",
                  "hide-scrollbar relative flex h-fit w-full origin-top flex-row gap-y-2 overflow-x-scroll rounded-xl bg-white shadow-2xl transition-transform ease-out md:w-full md:flex-col md:py-4",
                )}
              >
                {tabsTriggers.map((tab) => (
                  <TabsTrigger
                    key={`tab-${tab.name}`}
                    value={tab.name}
                    className="h-full capitalize data-[state=active]:!text-primary"
                    asChild
                  >
                    <Button className="flex h-full w-full flex-col items-center gap-y-1 bg-white py-4 text-black hover:bg-white hover:text-primary md:h-fit md:p-4">
                      {tab.icon}
                      <Text
                        variant="text-lg"
                        className="text-sm md:text-base lg:text-lg"
                      >
                        {tab.name}
                      </Text>
                    </Button>
                  </TabsTrigger>
                ))}
              </div>
            </div>

            {overflowDir === "right" || overflowDir === "both" ? (
              <div className="absolute right-0 top-1/2 z-10 grid aspect-square h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/40 shadow-xl shadow-white/10 lg:hidden">
                <ChevronRight
                  className="animate-chevron-right absolute text-xl text-white"
                  onClick={() =>
                    containerRef?.current?.scroll({
                      top: 0,
                      left: curScrollX + 150,
                      behavior: "smooth",
                    })
                  }
                />
              </div>
            ) : null}
          </div>

          <ProfileCard />
        </TabsList>

        <TabsContent value="about" className="mt-0">
          <AboutCard />
        </TabsContent>

        <TabsContent value="resume" className="mt-0">
          <ResumeCard />
        </TabsContent>

        <TabsContent value="blog" className="mt-0">
          <BlogCards />
        </TabsContent>

        <TabsContent value="contact" className="mt-0">
          <ContactCard />
        </TabsContent>

        <TabsContent value="work" className="mt-0 @container w-full">
          <WorkCards />
        </TabsContent>
      </Tabs>
    </section>
  );
}

const ProfileCard = () => {
  return (
    <div className="relative h-[600px] w-full sm:min-w-[300px] overflow-hidden rounded-xl bg-black text-white shadow-lg md:aspect-square md:h-auto md:w-auto md:max-w-sm">
      <div className="relative h-full w-full">
        <Image
          src={User}
          alt="Profile"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-black [clip-path:polygon(50%_70%,_100%_50%,_100%_100%,_0_100%,_0%_50%)]"></div>
      </div>
      <div className="absolute left-0 top-2/3 z-10 w-full">
        <div className="p-1 md:p-6 text-center">
          <Text variant="text-xl" className="mb-2 text-2xl font-bold">
            Andrey Rublev
          </Text>
          <p className="mb-4 text-primary">Lorem Ipsum</p>
          <div className="mb-6 flex justify-center space-x-4">
            <aside className="flex items-center justify-center gap-x-2">
              {socialIcons.map(({ href, icon, name }) => (
                <Link key={`social-link-${name}`} href={href} target="_blank">
                  <Image
                    key={`social-link-${name}`}
                    src={icon}
                    alt={`${name}-Icon`}
                    className="h-auto w-12 contrast-0"
                  />
                </Link>
              ))}
            </aside>
          </div>
          <div className="flex justify-between uppercase">
            <Button className="rounded-md px-2 py-1 bg-transparent md:px-4 md:py-2 uppercase">
              Download CV
            </Button>
            <Button className="rounded-md bg-transparent px-4 py-2 uppercase text-white">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
