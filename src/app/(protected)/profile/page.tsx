"use client";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, Briefcase, FileText, UserRound } from "lucide-react";
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
import { useState } from "react";
import { AboutCard } from "./about-card";
import { ResumeCard } from "./resume-card";
import { BlogCards } from "./blog";
import {ContactCard }from "./contact-card";
import { WorkCards } from "./work-card";
export default function ProfilePage() {
  const [hideTabs, setHideTabs] = useState(false);
  const tabsTriggers = [
    {
      icon: <FaRegUser className="size-6 md:size-8" />,
      name: "about",
    },
    {
      icon: <FileText className="size-6 md:size-8" />,
      name: "resume",
    },
    {
      icon: <BsCardText className="size-6 md:size-8" />,
      name: "blog",
    },
    {
      name: "contact",
      icon: <AtSign className="size-6 md:size-8" />,
    },
    {
      name: "work",
      icon: <Briefcase className="size-6 md:size-8" />,
    },
  ];
  return (
    <section className="container font-poppins">
      <CommonBanner title="Profile" bgImage={bgImage} />
      <Tabs
        defaultValue="about"
        className="relative z-10 flex flex-row items-stretch gap-x-10"
      >
        <TabsList className="flex h-fit flex-row bg-transparent gap-x-10 items-stretch">
          <div className="flex h-fit flex-col gap-y-4">
            <Button
              className="rouned-2xl flex h-fit w-full flex-col items-center gap-y-1 bg-white p-5 text-black shadow-2xl hover:bg-white hover:text-primary"
              onClick={() => setHideTabs(!hideTabs)}
            >
              <Menu className="size-10" />
            </Button>
            <div
              className={cn(
                hideTabs ? "scale-y-0" : "scale-y-100",
                "flex h-fit origin-top flex-col gap-y-2 rounded-xl bg-white py-4 shadow-2xl transition-transform ease-out",
              )}
            >
              {tabsTriggers.map((tab) => (
                <TabsTrigger
                  key={`tab-${tab.name}`}
                  value={tab.name}
                  className="capitalize data-[state=active]:!text-primary"
                  asChild
                >
                  <Button className="flex h-fit w-full flex-col items-center gap-y-1 bg-white p-4 text-black hover:bg-white hover:text-primary">
                    {tab.icon}
                    <Text variant="text-lg">{tab.name}</Text>
                  </Button>
                </TabsTrigger>
              ))}
            </div>
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
          <BlogCards/>
        </TabsContent>

        <TabsContent value="contact" className="mt-0">
          <ContactCard/>
        </TabsContent>

        <TabsContent value="work" className="mt-0">
          <WorkCards/>
        </TabsContent>
      </Tabs>
    </section>
  );
}

const ProfileCard = () => {
  return (
    <div className="relative aspect-square min-w-[300px] max-w-sm overflow-hidden rounded-xl bg-black text-white shadow-lg">
      <div className="relative h-full w-full">
        <Image
          src={User}
          alt="Profile"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-black [clip-path:polygon(50%_70%,_100%_50%,_100%_100%,_0_100%,_0%_50%)]"></div>
      </div>
      <div className="absolute left-0 top-2/3 z-10 w-full">
        <div className="p-6 text-center">
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
            <Button className="rounded-md bg-transparent px-4 py-2 uppercase">
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
