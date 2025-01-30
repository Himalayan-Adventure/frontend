import Image from "next/image";
import bgImage from "/public/images/packagesBanner.png";
import { Badge } from "@/components/ui/badge";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import {
  getCurrentUserDataDeep,
  getCurrentUserProfilePageData,
} from "@/server/auth/get-me";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `My Profile`,
  description: ` ${siteConfig.siteDescription}`,
};
export default async function ProfilePage() {
  const user = await getCurrentUserProfilePageData();
  if (!user) {
    redirect("/home");
  }
  return (
    <section className="container space-y-8 font-poppins" id="profile-page">
      <Image
        src={bgImage}
        alt="Background Image"
        objectFit="cover"
        quality={60}
        className="absolute inset-0 h-96 w-full object-cover lg:h-auto"
      />

      <div className="container relative z-10 flex min-h-60 flex-col justify-center space-y-3 text-white lg:space-y-6">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-[55px]">
          My Profile
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
