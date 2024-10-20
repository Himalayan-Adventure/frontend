import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

// (IDProperty & Omit<{
//     host_contact?: string | undefined;
//     short_description?: string | undefined;
//     facebook?: string | undefined;
//     instagram?: string | undefined;
//     linkedin?: string | undefined;
//     whatsapp?: string | undefined;
//     logo?: APIResponse<...> | ... 1 more ... | undefined;
// } & {
//     ...;
// }, never>) | undefined
export default function HostInfo({ data }: { data?: any }) {
  return (
    <section className="container py-4 lg:py-8">
      <div className="space-y-4">
        <div className="hidden">
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
          <div>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-green-100">B</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-base font-semibold md:text-lg">
              Hosted by {data?.host_name}
            </h2>
            <p className="text-sm text-gray-600 md:text-base">
              joined may 2021
            </p>
          </div>
        </div>
        <div className="space-y-3 text-sm md:text-base lg:max-w-lg">
          <p className="font-semibold">{data?.short_description}</p>
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
