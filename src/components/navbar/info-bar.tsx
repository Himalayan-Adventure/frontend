import Link from "next/link";
import Logo from "../logo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserCheck,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { m } from "framer-motion";
import { socialIcons } from "@/config/constants";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ChooseAccType } from "../auth/choose-acc-type";
export const InfoBar = ({ scrollY }: { scrollY: number }) => {
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
  const [user, setUser] = useState(null);

  return (
    <m.div
      initial={{ backgroundColor: "transparent", boxShadow: "none" }}
      animate={{
        backgroundColor: scrollY < 20 ? "transparent" : "rgba(0,0,0,0.9)",
        boxShadow:
          scrollY < 20 ? "none" : "0px 2px 5px -3px rgba(255,255,255,0.45)",
      }}
      className="py-7 text-white lg:py-3"
    >
      <div className="container flex items-center justify-between">
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
          <Button className="rounded-full border border-gray-50 bg-transparent px-10 py-3 font-semibold capitalize text-gray-50">
            <p className="text-base leading-none">Plan with us</p>
          </Button>
          {!user ? (
            // <DropdownMenu>
            //   <DropdownMenuTrigger className="group h-full rounded-full bg-background p-2 transition-all ease-in-out hover:bg-primary">
            //     <User className="size-6 text-primary transition-all ease-in-out group-hover:text-background" />
            //   </DropdownMenuTrigger>
            //   <DropdownMenuContent side="bottom">
            //     <DropdownMenuLabel>Not signed in</DropdownMenuLabel>
            //     <DropdownMenuSeparator />
            //
            //     <DropdownMenuGroup>
            //       <DropdownMenuItem>
            //         <UserCheck className="mr-2 h-4 w-4" />
            //         <span>Login</span>
            //       </DropdownMenuItem>
            //
            //       <DropdownMenuItem>
            <span className="flex flex-col items-stretch gap-y-1">
              <Dialog>
                <DialogTrigger className="flex items-center justify-center rounded-full border border-gray-100 px-4 py-1 text-white">
                  <UserPlus className="mr-2 h-4 w-4" strokeWidth={3} />
                  <p className="font-semibold">Register</p>
                </DialogTrigger>
                <ChooseAccType />
              </Dialog>

              <Dialog>
                <DialogTrigger className="flex items-center justify-center rounded-full bg-primary px-4 py-1 text-white">
                  <UserCheck className="mr-2 h-4 w-4" strokeWidth={3} />
                  <p className="font-semibold">Login</p>
                </DialogTrigger>
                <ChooseAccType />
              </Dialog>
            </span>
          ) : (
            //       </DropdownMenuItem>
            //     </DropdownMenuGroup>
            //   </DropdownMenuContent>
            // </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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

              <div className="flex flex-row justify-center gap-x-2 brightness-200">
                {socialIcons.map((item) => (
                  <Link
                    key={`social-link-${item.name}`}
                    href={item.href}
                    target="_blank"
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.name} Icon`}
                      className="h-auto w-12"
                    />
                  </Link>
                ))}
              </div>
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
    </m.div>
  );
};
