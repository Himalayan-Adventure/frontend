import { ProfileTabs } from "@/components/profile/profile-tabs";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import bgImage from "/public/images/packagesBanner.png";

import { siteConfig } from "@/config/site-config";
import { getSingleUserByUsername } from "@/server/users/get-user-by-username";
import type { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = (await params).username;

  const data = await getSingleUserByUsername({ username });
  if (!data) {
    return {
      title: "No user found!",
      description: `${siteConfig.siteName}`,
    };
  }

  const image = data?.profilePicture?.url || "";

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.username + " Profile",
    openGraph: {
      images: [image, ...previousImages],
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const user = await getSingleUserByUsername({ username });
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
          Public Profile
        </h1>
      </div>
      {user ? (
        <ProfileTabs user={user} />
      ) : (
        <Text variant="text-lg" className="relative z-[100] text-shadow-sm">
          User not found!
        </Text>
      )}
    </section>
  );
}
