import Link from "next/link";
import { LocationIcon, PhoneIcon } from "../icons";
import Logo from "../logo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Phone } from "lucide-react";
export const InfoBar = () => {
  return (
    <div className="flex justify-between items-center text-white">
      <Logo />
      <span className="flex gap-x-7 items-center">
        {/* TODO: replace lucide icon with figma icons*/}
        {[
          {
            name: "Reach Us",
            desc: "Kathmandu, Nepal",
            icon: <MapPin size={34} />,
            href: "https://maps.app.goo.gl/q217gfYsCbQEJv3B6",
          },
          {
            name: "Contact Us",
            desc: "+977 98867554",
            icon: <Phone size={28} />,
            href: "tel:+977 98867554",
          },
        ].map((item) => (
          <div
            key={`info-bar-${item.name}`}
            className="flex items-center gap-x-6"
          >
            <div className="border border-white rounded-full w-[52px] h-[52px]  aspect-square p-2 grid place-items-center">
              {item.icon}
            </div>
            <div>
              <Text variant="text-lg" bold>
                {item.name}
              </Text>
              <Link href={item.href} target="_blank">
                <Text variant="text-sm">{item.desc}</Text>
              </Link>
            </div>
          </div>
        ))}
      </span>
      <span className="flex items-center gap-x-7">
        <Button className="capitalize border border-gray-50 rounded-full text-base leading-5 px-10 py-3 bg-transparent text-gray-50 font-semibold">
          Plan with us
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </span>
    </div>
  );
};
