import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { APIResponse, IDProperty } from "@/types/types";

import { BiSolidBadgeCheck as Badge } from "react-icons/bi";
import { Text } from "../ui/text";

type props =
  | (IDProperty & {
      host_name: string;
      host_contact?: string | undefined;
      short_description?: string | undefined;
      logo?: APIResponse<"plugin::upload.file"> | null | undefined;
      socials?: IDProperty & {
        facebook?: string | undefined;
        instagram?: string | undefined;
        linkedin?: string | undefined;
        whatsapp?: string | undefined;
        twitter?: string | undefined;
        snapchat?: string | undefined;
        youtube?: string | undefined;
        pinterest?: string | undefined;
        tripadvisor?: string | undefined;
      };
    })
  | never
  | undefined;
export default function HostInfo({ data }: { data: props }) {
  return (
    <section className="container py-4 lg:py-8">
      <div className="space-y-4">
        <div className="hidden">
          {/* hidden because design seems incomplete*/}
          <h1 className="font-bold lg:text-lg">
            Bordeaux, Nouvelle-Aquitaine, France
          </h1>
          <p className="text-sm md:text-base">
            Very dynamic and appreciated district by the people of Bordeaux
            thanks to rue St James and place Fernand Lafargue. Home to many
            historical monuments such as the Grosse Cloche, the Porte de
            Bourgogne and the Porte Cailhau, and cultural sites such as the
            Aquitaine Museum.
          </p>
          {/* show more button  */}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="relative size-16">
              <AvatarImage
                //prettier-ignore
                //@ts-ignore
                src={data?.logo?.data.attributes?.formats?.thumbnail?.url||data?.logo?.data.attributes.url || ""}
                className="object-cover"
              />
              <AvatarFallback className="bg-green-100">B</AvatarFallback>
            </Avatar>

            <Badge
              className="absolute -bottom-2 right-0 text-primary"
              strokeWidth={1}
              stroke="#fff"
              size={26}
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-base font-semibold md:text-lg">
              Hosted by {data?.host_name}
            </h2>
            <p className="text-sm capitalize text-gray-600 md:text-base">
              Joined may 2021
            </p>
          </div>
        </div>
        <div className="space-y-3 text-balance text-sm md:text-base lg:max-w-xl">
          <Text semibold variant="text-xl">
            {data?.host_name} is a Superhost
          </Text>
          <p className="">{data?.short_description}</p>
          {/* <p>
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </p>
          <p>Response rate: 100%</p>
          <p>Response time: within an hour</p> */}
        </div>
        <div className="flex">
          {data?.host_contact && (
            <Link
              href={`tel:${data.host_contact}`}
              className="rounded-lg border border-black px-4 py-2 text-sm md:text-base"
            >
              Contact Host
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
