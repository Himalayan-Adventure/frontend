"use client";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import UserFallbackImg from "/public/images/user.png";
import { Text } from "@/components/ui/text";
import fbIcon from "/public/icons/facebook.png";
import WhatsAppIcon from "/public/icons/whatsApp.png";
import IgImage from "/public/icons/instagram.png";
import { APIResponseData } from "@/types/types";
import { DateValue } from "@/types/packages/departure";
import { format, isSameDay, isSameMonth, isSameYear } from "date-fns";
export const PastClimbersCard = ({
  user: data,
  startDate,
  endDate,
  testimonial,
}: {
  user: APIResponseData<"plugin::users-permissions.user">;
  startDate?: DateValue;
  endDate?: DateValue;
  testimonial?: string;
}) => {
  const user = data.attributes;
  const profilePicture = user?.profilePicture?.data?.attributes;
  return (
    <div className="relative flex w-full flex-col justify-between gap-y-4 rounded-xl py-3 text-center shadow-2xl sm:min-w-[300px] md:h-auto md:min-h-[400px] md:w-auto md:max-w-sm md:py-5 lg:py-8">
      <div className="relative flex h-full flex-col items-center gap-y-4">
        {profilePicture?.url ? (
          <Image
            src={profilePicture?.url || UserFallbackImg}
            width={profilePicture?.width || 400}
            height={profilePicture?.height || 400}
            alt="Profile picture of past climber"
            className="mx-auto aspect-square h-28 w-auto rounded-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gray-600">
            <UserIcon size={100} className="text-white" />
          </div>
        )}
        <div className="w-full space-y-2">
          <Text
            variant="text-xl"
            className="mb-2 text-2xl font-bold capitalize"
          >
            {user?.username}
          </Text>

          <div className="relative mx-auto w-[60%] rounded-md bg-black py-0.5 font-semibold text-white">
            Climber
          </div>
        </div>
        {testimonial && (
          <Text className="text-gray-500" variant="text-md">
            {testimonial}
          </Text>
        )}
        <div className="relative flex w-[70%] flex-col items-center space-y-0.5 rounded-md border border-gray-300 py-2">
          <Text semibold variant="text-sm">
            Summit Date
          </Text>

          <Text className="text-gray-600" variant="text-sm">
            {startDate && endDate
              ? formatDateRange(startDate, endDate)
              : startDate
                ? format(startDate, "d MMM yyyy")
                : endDate
                  ? format(endDate, "d MMM yyyy")
                  : ""}
          </Text>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <span className="flex items-center justify-center gap-x-2">
          {user?.about?.facebook && (
            <Link href={user?.about?.facebook} target="_blank">
              <Image
                src={fbIcon}
                alt={`facebook-Icon`}
                className="h-10 w-auto"
              />
            </Link>
          )}
          {user?.about?.instagram && (
            <Link href={user?.about?.instagram} target="_blank">
              <Image
                src={IgImage}
                alt={`instagram-Icon`}
                className="h-10 w-auto"
              />
            </Link>
          )}
          {user?.about?.whatsapp && (
            <Link href={user?.about?.whatsapp} target="_blank">
              <Image
                src={WhatsAppIcon}
                alt={`whatsapp-Icon`}
                className="h-10 w-auto"
              />
            </Link>
          )}
        </span>
      </div>
      {/*Crediting the resource for icons*/}
      <a href="https://www.freepik.com/search" className="hidden">
        Icon by Freepik
      </a>
    </div>
  );
};

import { cn } from "@/lib/utils";
import useUpdateQueryString from "@/hooks/use-update-query-string";
function formatDateRange(start: Date | string, end: Date | string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isSameDay(startDate, endDate)) {
    return `${format(endDate, "d MMM yyyy")}`;
  } else if (
    isSameMonth(startDate, endDate) &&
    isSameYear(startDate, endDate)
  ) {
    return `${format(startDate, "d")}-${format(endDate, "d MMM yyyy")}`;
  } else if (isSameYear(startDate, endDate)) {
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM yyyy")}`;
  } else {
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM")}, ${format(startDate, "yyyy")}/${format(endDate, "yy")}`;
  }
}
