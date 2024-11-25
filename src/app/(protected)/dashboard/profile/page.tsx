"use client";
import { Text } from "@/components/ui/text";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { socialIcons } from "@/config/constants";
import { useQuery } from "@tanstack/react-query";
import { TUser, TUserDeep } from "@/types/auth";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { ProfileTabs } from "@/components/profile/profile-tabs";
export default function ProfilePage() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get<TUserDeep>("/api/me");

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
      {/*Header*/}
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Profile
        </Text>
        <Link href="/dashboard/profile/edit">
          <Button className="gap-x-1 bg-black text-sm text-white">
            <PenLine size={16} />
            Edit
          </Button>
        </Link>
      </span>
      {!user?.confirmed && (
        <Badge className="bg-red-100 text-black">
          Please confirm your email
        </Badge>
      )}
      {user && <ProfileTabs user={user} />}
    </section>
  );
}
