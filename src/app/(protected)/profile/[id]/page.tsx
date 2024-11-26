"use client";
import Image from "next/image";
import bgImage from "/public/images/packagesBanner.png";
import { useQuery } from "@tanstack/react-query";
import { TUserDeep } from "@/types/auth";
import axios from "axios";
import { ProfileTabs } from "@/components/profile/profile-tabs";
export default function PublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  const { data: user, isPending } = useQuery({
    queryKey: ["public-user", params.id],
    queryFn: async () => {
      try {
        const res = await axios.get<TUserDeep>(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users/${params.id}?populate=deep`,
        );

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
