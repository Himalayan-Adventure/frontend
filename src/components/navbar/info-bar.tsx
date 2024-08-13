import Link from "next/link";
import { LocationIcon, PhoneIcon } from "../icons";
import Logo from "../logo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Menu, Phone } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
export const InfoBar = () => {
  const contacts = [
    {
      name: "Reach Us",
      desc: "Kathmandu, Nepal",
      icon: <MapPin size={34} className="size-6 lg:size-8" />,
      href: "https://maps.app.goo.gl/q217gfYsCbQEJv3B6",
    },
    {
      name: "Contact Us",
      desc: "+977 98867554",
      icon: <Phone size={28} className="size-6 lg:size-7" />,
      href: "tel:+977 98867554",
    },
  ];

  return (
    <div className="flex justify-between items-center text-white bg-black/40 container py-7 lg:py-3">
      <Logo className="max-w-[130px] lg:max-w-[220px]" />
      <span className="hidden lg:flex gap-x-7 items-center">
        {/* TODO: replace lucide icon with figma icons*/}
        {contacts.map((item) => (
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
      <span className="lg:flex items-center gap-x-7 hidden">
        <Button className="capitalize border border-gray-50 rounded-full text-base  px-10 py-3 bg-transparent text-gray-50 font-semibold leading-none">
          Plan with us
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </span>

      {/*  For mobile*/}
      <Drawer direction="right" shouldScaleBackground={false}>
        <DrawerTrigger className="lg:hidden">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="container flex h-full justify-between lg:hidden bg-black/40 text-white border-none">
          <div className="pt-10 space-y-4">
            {contacts.map((item) => (
              <div
                key={`info-bar-${item.name}`}
                className="flex items-start gap-x-6 "
              >
                {item.icon}
                <span>
                  <Text variant="text-md" bold>
                    {item.name}
                  </Text>
                  <Link href={item.href} target="_blank">
                    <Text variant="text-sm">{item.desc}</Text>
                  </Link>
                </span>
              </div>
            ))}
          </div>

          <span className="flex flex-col items-start gap-y-7 lg:hidden py-5">
            <Button className="capitalize border border-gray-50 rounded-full text-base leading-5 px-10 py-3 bg-transparent text-gray-50 font-semibold">
              Plan with us
            </Button>
            <span className="flex items-start gap-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="flex flex-col items-start">
                <Text variant="text-md" className="max-w-60 truncate" medium>
                  John Doe
                </Text>
                <Text
                  variant="text-sm"
                  className="max-w-60 truncate text-gray-400"
                  medium
                >
                  xxx.xxx@gmail.com
                </Text>
              </span>
            </span>
          </span>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
