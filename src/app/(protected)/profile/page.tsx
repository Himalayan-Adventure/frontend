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
  PencilIcon,
  PenLine,
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
import { AboutCard } from "@/components/profile/about-card";
import { ResumeCard } from "@/components/profile/resume-card";
import { BlogCards } from "@/components/profile/blog";
import { ContactCard } from "@/components/profile/contact-card";
import { useOverflowDetection } from "@/hooks/use-overflow-detection";
import { useQuery } from "@tanstack/react-query";
import { TUser, TUserDeep } from "@/types/auth";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { WorkCards } from "@/components/profile/work-card";
import Banner from "@/components/profile/banner";
import { ProfileTabs } from "@/components/profile/profile-tabs";
export default function ProfilePage() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get<TUserDeep>("/api/me?populate=deep");

        if (!res?.data) {
          return null;
        }
        console.log(res.data);

        return res.data;
      } catch (error) {
        console.error("Error fetching user data", error);
        return null;
      }
    },
    retry: 1,
  });
  const [hideTabs, setHideTabs] = useState(false);
  const tabsTriggers = [
    {
      icon: <FaRegUser className="size-5 md:size-8" />,
      name: "about",
    },
    // {
    //   icon: <FileText className="size-5 md:size-8" />,
    //   name: "resume",
    // },
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
  if (user?.userType === "merchant") {
    tabsTriggers.splice(1, 0, {
      icon: <FileText className="size-5 md:size-8" />,
      name: "resume",
    });
  }
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
    <section className="container space-y-8 font-poppins">
      <Image
        src={bgImage}
        alt="Background Image"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 h-96 w-full object-cover lg:h-auto"
      />

      <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
          Profile
        </h1>
      </div>
      {/*Header*/}
      {!user?.confirmed && (
        <Badge className="bg-red-100 text-black">
          Please confirm your email
        </Badge>
      )}
      {user && <ProfileTabs user={user} />}
    </section>
  );
}
