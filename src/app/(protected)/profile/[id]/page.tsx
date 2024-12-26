import Image from "next/image";
import bgImage from "/public/images/packagesBanner.png";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { getSingleUser } from "@/server/users/get-single-user";
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
      {user && <ProfileTabs user={user} />}
    </section>
  );
}
