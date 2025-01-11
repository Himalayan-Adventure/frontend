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
} from "lucide-react";
import { IoReorderTwoSharp as Menu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { AboutCard } from "@/components/profile/about-card";
import { ResumeCard } from "@/components/profile/resume-card";
import { BlogCards } from "@/components/profile/blog-cards";
import { ContactCard } from "@/components/profile/contact-card";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
import { WorkCards } from "@/components/profile/work-cards";
import { ProfileCard } from "@/components/profile/profile-card";
import { TUserDeep } from "@/types/auth";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { useSearchParams } from "next/navigation";

export function ProfileTabs({ user }: { user: TUserDeep }) {
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
  const searchParams = useSearchParams();
  const updateQueryString = useUpdateQueryString();
  return (
    <Tabs
      defaultValue={searchParams?.get("tab") || "about"}
      className="relative z-10 flex flex-col items-stretch gap-x-10 gap-y-10 xl:flex-row"
      onValueChange={(value) => {
        updateQueryString({ tab: value });
      }}
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
          <div className="flex items-stretch gap-2 md:h-fit md:max-w-28 md:flex-col md:gap-4">
            <Button
              className="rouned-2xl hidden h-auto w-fit flex-col items-center gap-y-1 bg-white p-5 text-black shadow-2xl hover:bg-white hover:text-primary md:flex md:h-fit md:w-full md:p-8 lg:p-6"
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

        <ProfileCard user={user || null} />
      </TabsList>

      <TabsContent value="about" className="mt-0 w-full">
        {user && <AboutCard user={user} />}
      </TabsContent>

      <TabsContent value="resume" className="mt-0 w-full">
        {user && <ResumeCard user={user} />}
      </TabsContent>

      <TabsContent value="blog" className="mt-0 w-full">
        <BlogCards />
      </TabsContent>

      <TabsContent value="contact" className="mt-0 w-full">
        {user && <ContactCard user={user} />}
      </TabsContent>

      <TabsContent value="work" className="mt-0 w-full @container">
        {user && <WorkCards user={user} />}
      </TabsContent>
    </Tabs>
  );
}
