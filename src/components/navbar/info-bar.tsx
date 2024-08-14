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
    <div className="container flex items-center justify-between bg-black/40 py-7 text-white lg:py-3">
      <Logo className="max-w-[130px] lg:max-w-[220px]" />
      <span className="hidden items-center gap-x-7 lg:flex">
        {/* TODO: replace lucide icon with figma icons*/}
        {contacts.map((item) => (
          <div
            key={`info-bar-${item.name}`}
            className="flex items-center gap-x-6"
          >
            <div className="grid aspect-square h-[52px] w-[52px] place-items-center rounded-full border border-white p-2">
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
      <span className="hidden items-center gap-x-7 lg:flex">
        <Button className="rounded-full border border-gray-50 bg-transparent px-10 py-3 text-base font-semibold capitalize leading-none text-gray-50">
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
        <DrawerContent className="container flex h-full justify-between border-none bg-black/40 text-white lg:hidden">
          <div className="space-y-4 pt-10">
            {contacts.map((item) => (
              <div
                key={`info-bar-${item.name}`}
                className="flex items-start gap-x-6"
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

          <span className="flex flex-col items-start gap-y-7 py-5 lg:hidden">
            <Button className="rounded-full border border-gray-50 bg-transparent px-10 py-3 text-base font-semibold capitalize leading-5 text-gray-50">
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
