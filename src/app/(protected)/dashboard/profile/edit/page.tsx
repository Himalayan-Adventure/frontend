import { GoBackButton } from "@/components/profile/go-back-button";
import { Text } from "@/components/ui/text";
import { getCurrentUserDataDeep, getCurrentUserProfilePageData } from "@/server/auth/get-me";
import ProfileEditForm from "./edit-form";
import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: `Edit Profile`,
  description: ` ${siteConfig.siteName}`,
};

export default async function EditProfilePage() {
  const user = await getCurrentUserProfilePageData();
  if (!user) {
    redirect("/dashboard/profile");
  }
  return (
    <section className="container max-w-4xl">
      <GoBackButton />
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          Edit Profile
        </Text>
      </div>
      {user && (
        <Suspense>
          <ProfileEditForm user={user} />
        </Suspense>
      )}
    </section>
  );
}
