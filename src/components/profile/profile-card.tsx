"use client";
import { socialIcons } from "@/config/constants";
import { TUser, TUserDeep } from "@/types/auth";
import { Mail, Phone, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import generatePDF, { Margin } from "react-to-pdf";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import fbIcon from "/public/icons/facebook-bw.png";
import IgImage from "/public/icons/instagram-bw.png";
import WhatsAppIcon from "/public/icons/whatsApp-bw.png";
import UserImg from "/public/images/user.png";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
export const ProfileCard = ({ user }: { user: TUserDeep | null }) => {
  const userPfp = user?.profilePicture?.formats?.medium || user?.profilePicture;
  const getTargetElement = () => document.getElementById("profile-page");
  const [isLoading, setIsLoading] = useState(false);
  const handleGeneratePDF = async () => {
    setIsLoading(true);
    try {
      await generatePDF(getTargetElement, {
        filename: `${user?.username} Resume`,
        method: "save",
        page: {
          orientation: "portrait",
          margin: Margin.SMALL,
        },
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-black text-white shadow-lg sm:min-w-[300px] md:aspect-square md:h-auto md:min-h-[580px] md:w-auto md:max-w-sm">
      <div className="relative h-full w-full">
        {userPfp ? (
          <Image
            src={userPfp.url}
            width={userPfp?.width || 400}
            height={userPfp?.height || 400}
            alt="Profile Picture"
            quality={60}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gray-600">
            <UserIcon size={100} />
          </div>
        )}
        <div className="absolute inset-0 h-full w-full bg-black [clip-path:polygon(50%_70%,_100%_50%,_100%_100%,_0_100%,_0%_50%)]"></div>
      </div>
      <div className="absolute left-0 top-2/3 z-10 w-full">
        <div className="p-1 text-center md:p-6">
          <Text
            variant="text-xl"
            className="mb-2 text-2xl font-bold capitalize"
          >
            {user?.username}
          </Text>
          <p className="mb-4 text-primary">{user?.email}</p>
          <div className="mb-6 flex justify-center space-x-4">
            <aside className="flex items-center justify-center gap-x-2">
              {user?.about?.facebook && (
                <Link href={user?.about?.facebook} target="_blank">
                  <Image
                    src={fbIcon}
                    alt={`facebook-Icon`}
                    className="h-auto w-12 contrast-0"
                  />
                </Link>
              )}
              {user?.about?.instagram && (
                <Link href={user?.about?.instagram} target="_blank">
                  <Image
                    src={IgImage}
                    alt={`instagram-Icon`}
                    className="h-auto w-12 contrast-0"
                  />
                </Link>
              )}
              {user?.about?.whatsapp && (
                <Link href={user?.about?.whatsapp} target="_blank">
                  <Image
                    src={WhatsAppIcon}
                    alt={`whatsapp-Icon`}
                    className="h-auto w-12 contrast-0"
                  />
                </Link>
              )}
              {/*
              {socialIcons.map(({ href, icon, name }) => (
                <Link key={`social-link-${name}`} href={href} target="_blank">
                  <Image
                    key={`social-link-${name}`}
                    src={icon}
                    alt={`${name}-Icon`}
                    className="h-auto w-12 contrast-0"
                  />
                </Link>
              ))}
                */}
            </aside>
          </div>
          <div className="flex justify-between uppercase">
            {user?.userType === "merchant" && (
              <Button
                className="rounded-md bg-transparent px-2 py-1 uppercase md:px-4 md:py-2"
                onClick={handleGeneratePDF}
              >
                Download CV
              </Button>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button className="rounded-md bg-transparent px-4 py-2 uppercase text-white">
                  Contact Me
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="flex w-fit items-center justify-center gap-x-2 bg-gray-100"
              >
                {user?.email && (
                  <Link
                    href={`mailto:${user.email}`}
                    className="grid w-fit place-items-center rounded-full border border-blue-300 bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
                  >
                    <Mail size={18} />
                  </Link>
                )}

                {user?.contact && user?.contact.phone && (
                  <Link
                    href={`tel:+977 ${user.contact.phone}`}
                    className="grid w-fit place-items-center rounded-full border border-blue-300 bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
                  >
                    <Phone size={18} />
                  </Link>
                )}
                {!(user?.email && user?.contact?.phone) && (
                  <Text variant="text-sm">No contact details provided</Text>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

const LegacyProfileCard = ({ user }: { user: TUser | null }) => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-black text-white shadow-lg sm:min-w-[300px] md:aspect-square md:h-auto md:w-auto md:max-w-sm">
      <div className="relative h-full w-full">
        <Image
          src={UserImg}
          alt="Profile"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-black [clip-path:polygon(50%_70%,_100%_50%,_100%_100%,_0_100%,_0%_50%)]"></div>
      </div>
      <div className="absolute left-0 top-2/3 z-10 w-full">
        <div className="p-1 text-center md:p-6">
          <Text
            variant="text-xl"
            className="mb-2 text-2xl font-bold capitalize"
          >
            {user?.username}
          </Text>
          <p className="mb-4 text-primary">{user?.email}</p>
          <div className="mb-6 flex justify-center space-x-4">
            <aside className="flex items-center justify-center gap-x-2">
              {socialIcons.map(({ href, icon, name }) => (
                <Link key={`social-link-${name}`} href={href} target="_blank">
                  <Image
                    key={`social-link-${name}`}
                    src={icon}
                    alt={`${name}-Icon`}
                    className="h-auto w-12 contrast-0"
                  />
                </Link>
              ))}
            </aside>
          </div>
          <div className="flex justify-between uppercase">
            <Button className="rounded-md bg-transparent px-2 py-1 uppercase md:px-4 md:py-2">
              Download CV
            </Button>
            <Button className="rounded-md bg-transparent px-4 py-2 uppercase text-white">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
