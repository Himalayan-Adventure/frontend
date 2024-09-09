"use client";
import { Text } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, Briefcase, FileText, Link, UserRound } from "lucide-react";
import { IoReorderTwoSharp as Menu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import User from "/public/images/user.png";
import CommonBanner from "@/components/ui/common-banner";

import bgImage from "/public/images/packagesBanner.png";
import { socialIcons } from "@/config/constants";
export default function ProfilePage() {
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
        className="relative z-50 flex flex-row items-stretch gap-x-10"
      >
        <TabsList className="flex h-fit flex-col gap-y-4 bg-white">
          <Button className="rouned-2xl flex h-fit w-full flex-col items-center gap-y-1 bg-white p-5 text-black shadow-2xl hover:bg-white hover:text-primary">
            <Menu className="size-10" />
          </Button>
          <div className="flex h-fit flex-col gap-y-2 rounded-xl bg-white py-4 shadow-2xl">
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
        </TabsList>
        <ProfileCard />

        <TabsContent value="about">
          <div>
            <AboutSection />
            <MyServices />
          </div>
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
const AboutSection = () => {
  return (
    <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">About</h1>
        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac
          porta odio. Morbi imperdiet ligula eu nisl viverra, et idareet erat
          faucibus. In a velit at neque tincidunt elementum. Maecenas ultrices
          sollicitudin quam at hendrerit. Praesent tempus turpis mi, sed aliquet
          lectus dapibus in. Interdum et malesuada fames ac ante ipsum primis in
          faucibus.
        </p>
      </div>
    </div>
  );
};

const ServiceItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center space-x-4 text-center">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">
          <UserRound />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const MyServices = () => {
  return (
    <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900">My Services</h2>
        <div className="mt-12 flex items-start divide-x-2">
          <ServiceItem
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. endent. Present tempus turpis mi, sed aliquet lectus dapibus in."
          />
          <ServiceItem
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. endent. Present tempus turpis mi, sed aliquet lectus dapibus in."
          />
        </div>
      </div>
    </div>
  );
};
