import React from "react";

import { getCurrentUserData } from "@/server/auth/get-me";
import ProfileSidebarLayout from "./profile-layout";

export default async function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUserData();

  return (
    <ProfileSidebarLayout user={user || null}>
      <section className="h-full w-full px-4 sm:px-6 lg:px-8">
        {children}
      </section>
    </ProfileSidebarLayout>
  );
}
