import Link from "next/link";
import Logo from "../logo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreditCard,
  LogOut,
  MapPin,
  Menu,
  Phone,
  Settings,
  User,
  UserCheck,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { m } from "framer-motion";
import { socialIcons } from "@/config/constants";
import { useEffect, useState } from "react";
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
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { ChooseAccType } from "../auth/choose-acc-type";
import { AuthCard } from "../auth";
import { useCurrentAuthDialog } from "@/store/get-current-auth-dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TUser } from "@/types/auth";
import { toast } from "sonner";
import { logout } from "@/server/auth/logout";
export const InfoBar = ({ scrollY }: { scrollY: number }) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { dialogOpen, setDialogOpen } = useCurrentAuthDialog();
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
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

  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get<TUser>("/api/me");

        if (!res?.data) {
          return null;
        }

        return res.data;
      } catch (error) {
        console.error("Error fetching user data", error);
        return null;
      }
    },
    retry: 5,
  });

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
        <span className="hidden items-stretch gap-x-3 lg:flex">
          <Link href="/plan-with-us">
            <Button className="rounded-full border border-gray-50 bg-transparent px-10 py-3 font-semibold capitalize text-gray-50">
              <p className="text-base leading-none">Plan with us</p>
            </Button>
          </Link>
          {!user ? (
            <span className="relative flex h-full flex-col items-stretch gap-y-1">
              <Dialog>
                <DialogTrigger
                  className="flex h-10 items-center justify-center rounded-full border border-primary bg-primary px-8 py-1 text-white transition-all ease-in-out hover:bg-transparent hover:text-primary"
                  onClick={() => setDialogOpen(true)}
                >
                  <UserCheck className="mr-2 h-4 w-4" strokeWidth={3} />
                  <p className="font-semibold">Login</p>
                </DialogTrigger>
                {dialogOpen && <AuthCard />}
              </Dialog>
            </span>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    toast.promise(logout(), {
                      loading: "Logging out...",
                      success: "Logged out successfully",
                      error: "Failed to log out",
                    });

                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
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

            <span className="flex flex-col items-start gap-3 py-5 lg:hidden">
              <Link href="/plan-with-us">
                <Button className="rounded-full border border-gray-50 bg-transparent px-10 py-3 text-base font-semibold capitalize leading-5 text-gray-50">
                  Plan with us
                </Button>
              </Link>
              {user ? (
                <span className="flex cursor-pointer items-start gap-x-4">
                  <Link href="/profile">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <span className="flex flex-col items-start gap-y-2">
                    <Link href="/profile">
                      <Text
                        variant="text-md"
                        className="max-w-60 truncate"
                        medium
                      >
                        {user.username}
                      </Text>
                      <Text
                        variant="text-sm"
                        className="max-w-60 truncate text-gray-400"
                        medium
                      >
                        {user.email}
                      </Text>
                    </Link>
                    <Button
                      onClick={async () => {
                        toast.promise(logout(), {
                          loading: "Logging out...",
                          success: "Logged out successfully",
                          error: "Failed to log out",
                        });

                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </span>
                </span>
              ) : (
                <span className="flex items-stretch gap-x-3">
                  {/* <Dialog> */}
                  {/*   <DialogTrigger */}
                  {/*     className="flex items-center justify-center rounded-full border border-gray-100 px-4 py-1 text-white" */}
                  {/*     onClick={() => setRegisterDialogOpen(true)} */}
                  {/*   > */}
                  {/*     <UserPlus className="mr-2 h-4 w-4" strokeWidth={3} /> */}
                  {/*     <p className="font-semibold">Register</p> */}
                  {/*   </DialogTrigger> */}
                  {/*   {registerDialogOpen && ( */}
                  {/*     <RegisterCard setIsOpen={setRegisterDialogOpen} /> */}
                  {/*   )} */}
                  {/* </Dialog> */}

                  <Dialog>
                    <DialogTrigger
                      className="flex h-10 items-center justify-center rounded-full bg-primary px-10 py-3 text-white"
                      onClick={() => setDialogOpen(true)}
                    >
                      <UserCheck className="mr-2 h-4 w-4" strokeWidth={3} />
                      <p className="font-semibold">Login</p>
                    </DialogTrigger>
                    {dialogOpen && <AuthCard />}
                  </Dialog>
                </span>
              )}

              <div className="flex flex-row justify-center gap-x-2 brightness-200">
                {socialIcons.map((item) => (
                  <Link
                    prefetch={true}
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
            </span>
          </DrawerContent>
        </Drawer>
      </div>
    </m.div>
  );
};
