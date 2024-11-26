"use client";
import Logo from "@/components/logo";
import { cn, formatDate } from "@/lib/utils";
import { Heart, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { APIResponseData } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";

export const ServiceCard = ({
  data,
}: {
  data: APIResponseData<"api::service.service">;
}) => {
  const [isFav, setIsFav] = useState(false);
  const image = data?.attributes?.image?.data?.attributes;
  //@ts-ignore
  const service_provider = data?.attributes?.service_provider?.data;
  console.log(service_provider);
  console.log(data);
  return (
    <div className="relative z-10 grid max-w-[300px] grid-rows-[auto_auto] rounded-lg bg-white px-2 pt-2 shadow-2xl md:px-3 md:pt-3">
      <div className="relative h-full">
        {image?.url ? (
          <Image
            src={image?.url}
            alt={image?.name || data?.attributes?.title}
            width={image?.width || 400}
            height={image?.height || 400}
            className="relative aspect-square h-full w-full rounded-bl-3xl rounded-tr-3xl object-cover lg:max-h-96"
          />
        ) : (
          <div className="relative aspect-square h-full w-full rounded-bl-3xl rounded-tr-3xl bg-gray-300 object-cover lg:max-h-96" />
        )}
      </div>
      <div className="relative flex w-full flex-col items-center gap-y-2 pb-4 pt-2 text-center font-poppins">
        <span
          className={cn(
            service_provider ? "justify-between" : "justify-end",
            "flex w-full items-center",
          )}
        >
          {service_provider && (
            <span className="flex items-center gap-x-2">
              <Avatar className="size-8">
                <AvatarImage src={image?.url} className="saturate-0" />
                <AvatarFallback>
                  {service_provider.attributes.username?.[0]}
                </AvatarFallback>
              </Avatar>
              <Text variant="text-xs" className="text-gray-500">
                {service_provider?.attributes?.username}
              </Text>
            </span>
          )}
          {data?.attributes?.createdAt && (
            <Text variant="text-xs" className="text-gray-500">
              {formatDate(data?.attributes?.createdAt.toString())}
            </Text>
          )}
        </span>
        <h2 className="text-sm font-semibold md:text-base">
          {data?.attributes?.title}
        </h2>
        <div className="flex flex-col items-stretch space-y-2">
          <Button className="w-auto rounded-xl bg-black px-6 py-1 text-xs text-white md:text-base lg:px-12 lg:py-2">
            Request Service
          </Button>
          <Button className="w-auto rounded-xl px-6 py-1 text-xs text-white md:text-base lg:px-12 lg:py-2">
            Make Inquiry
          </Button>
        </div>
      </div>
    </div>
  );
};
export const LegacyServiceCard = ({
  data,
}: {
  data: { name: string; image: StaticImageData };
}) => {
  const [isFav, setIsFav] = useState(false);
  return (
    <div className="relative z-10 grid max-w-[300px] grid-rows-[auto_auto] rounded-lg bg-white px-2 pt-2 shadow-2xl md:px-3 md:pt-3">
      <div className="relative h-full">
        <Image
          src={data.image}
          alt={data.name}
          className="relative aspect-square h-full w-full rounded-bl-2xl rounded-tr-2xl object-cover lg:max-h-96"
        />
        <span className="absolute right-2 top-2">
          <Heart
            size="20"
            className={cn(
              isFav ? "text-white" : "text-primary",
              "cursor-pointer transition-all ease-in",
            )}
            fill={isFav ? "#FD9100" : "none"}
            onClick={() => setIsFav((prev) => !prev)}
          />
        </span>
      </div>
      <div className="relative flex w-full flex-col items-center gap-y-2 py-2 text-center">
        <span className="absolute right-2 flex items-center gap-x-1 text-primary">
          <Star size="16" fill="#FD9100" />
          5.0
        </span>
        <Logo theme="light" className="mx-auto h-8 lg:h-12" />
        <h2 className="mb-2 text-sm font-semibold md:text-base">{data.name}</h2>
        <div className="flex flex-col items-center space-y-3">
          <Button className="w-auto rounded-lg px-6 py-1 text-xs text-white md:text-sm lg:px-12 lg:py-2">
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
