import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { socialIcons } from "@/config/constants";
import { logout } from "@/server/auth/logout";
import { useCurrentAuthDialog } from "@/store/get-current-auth-dialog";
import { TUser } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { m } from "framer-motion";
import {
  LogOut,
  MapPin,
  Menu,
  Phone,
  Settings,
  Settings2,
  ShoppingCart,
  User,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { AuthCard } from "../auth";
import Logo from "../logo";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import { navLinks } from "@/config/navbar-links";
import { Separator } from "@radix-ui/react-select";
export const InfoBar = ({ scrollY }: { scrollY: number }) => {
  const { dialogOpen, setDialogOpen } = useCurrentAuthDialog();
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
        const res = await fetch("/api/me?populate[0]=profilePicture", {
          cache: "no-cache",
          next: {
            tags: ["me"],
          },
        });
        const data: TUser = await res.json();

        if (!data) {
          return null;
        }

        return data;
      } catch (error) {
        console.error("Error fetching user data", error);
        return null;
      }
    },
    retry: 1,
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
          {isPending ? (
            <span className="relative flex h-full flex-col items-stretch gap-y-1">
              <Skeleton className="size-10 rounded-full" />
            </span>
          ) : user === null || !user?.id ? (
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
                <Avatar className="cursor-pointer border-2 border-white/40">
                  {user?.profilePicture && (
                    <AvatarImage
                      src={
                        user?.profilePicture.formats?.thumbnail?.url ||
                        user.profilePicture?.url
                      }
                      alt={user.username}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-gray-400 text-black">
                    {user?.username?.[0]}
                  </AvatarFallback>
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
                  <DropdownMenuItem asChild>
                    <Link href="/my-cart" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My Cart</span>
                    </Link>
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
          <DrawerContent className="hide-scrollbar container flex h-full justify-between overflow-y-scroll border-none bg-black/40 text-white lg:hidden">
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
              <Separator className="h-px w-full bg-gray-400" />

              <div className="flex flex-col items-start gap-4">
                {navLinks.map((navLink) => (
                  <Link key={`mobile-link-${navLink.href}`} href={navLink.href}>
                    <div className="flex items-center gap-x-6">
                      {navLink.icon}
                      <Text variant="text-sm">{navLink.name}</Text>
                    </div>
                  </Link>
                ))}

                <Link href={"/profile"}>
                  <div className="flex items-center gap-x-6">
                    <User className="size-6 lg:size-7" />
                    <Text variant="text-sm">Profile</Text>
                  </div>
                </Link>

                <Link href={"/dashboard/profile"}>
                  <div className="flex items-center gap-x-6">
                    <Settings2 className="size-6 lg:size-7" />
                    <Text variant="text-sm">Dashboard</Text>
                  </div>
                </Link>
              </div>
            </div>
            <span className="flex flex-col items-start gap-3 py-5 lg:hidden">
              <Link href="/plan-with-us">
                <Button className="rounded-full border border-gray-50 bg-transparent px-10 py-3 text-base font-semibold capitalize leading-5 text-gray-50">
                  Plan with us
                </Button>
              </Link>
              {isPending ? (
                <span className="relative flex h-full flex-col items-stretch gap-y-1">
                  <Skeleton className="size-10 rounded-full" />
                </span>
              ) : user === null || !user?.id ? (
                <span className="flex items-stretch gap-x-3">
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
              ) : (
                <span className="flex cursor-pointer items-start gap-x-4">
                  <Link href="/profile">
                    <Avatar className="h-10 cursor-pointer border-2 border-white/40">
                      {user?.profilePicture && (
                        <AvatarImage
                          src={
                            user?.profilePicture.formats?.thumbnail?.url ||
                            user.profilePicture?.url
                          }
                          alt={user.username}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="bg-gray-400 text-black">
                        {user?.username?.[0]}
                      </AvatarFallback>
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
              )}

              <div className="flex flex-row justify-center gap-x-2 brightness-200">
                {socialIcons.map((item) => (
                  <Link
                    // prefetch={true}
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
