import Image from "next/image";
import bgImage from "/public/images/packagesBanner.png";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { getSingleUser } from "@/server/users/get-single-user";
import { Text } from "@/components/ui/text";

import type { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site-config";
type Props = {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).id;

  const data = await getSingleUser({ id });
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
  params: { id: number };
}) {
  const { id } = params;
  const user = await getSingleUser({ id });
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
        <Text variant="text-lg">User not found!</Text>
      )}
    </section>
  );
}
