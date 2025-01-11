import { Text } from "@/components/ui/text";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { getCurrentUserDataDeep } from "@/server/auth/get-me";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `My Profile Dashboard`,
  description: ` ${siteConfig.siteDescription}`,
};
export default async function ProfilePage() {
  const user = await getCurrentUserDataDeep();
  if (!user) {
    redirect("/home");
  }
  return (
    <section className="container space-y-8 font-poppins">
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          My Profile
        </Text>
        <Link href="/dashboard/profile/edit">
          <div className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <PenLine size={16} />
            Edit
          </div>
        </Link>
      </span>
      {user && !user?.confirmed && (
        <Badge className="bg-red-100 text-black">
          Please confirm your email
        </Badge>
      )}
      {user && <ProfileTabs user={user} />}
    </section>
  );
}
