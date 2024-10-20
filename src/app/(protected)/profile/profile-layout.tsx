"use client";

import { SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";
import { navigations } from "@/config/profile-sidebar-nav";
import { cn } from "@/lib/utils";
//import { type TUser } from '@/types/user';
//import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Menu } from "lucide-react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { TUser } from "@/types/auth";

// This is the whole layout for the dashboard which includes the sidebar and the main content which is passed as children
export default function ProfileSidebarLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: Maybe<TUser>;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <div>
      <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <SidebarContent
          user={user}
          setSidebarHidden={setSidebarHidden}
          sidebarHidden={sidebarHidden}
        />
      </Sidebar>
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false}>
          {!sidebarHidden && (
            <m.div
              key="sidebar"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="hidden w-full lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
            >
              <SidebarContent
                user={user}
                setSidebarHidden={setSidebarHidden}
                sidebarHidden={sidebarHidden}
              />
            </m.div>
          )}

          <div
            className={cn(
              !sidebarHidden && "transition-all duration-200 lg:pl-72",
            )}
          >
            <div className="sticky top-0 z-[100] flex h-[var(--profile-header-height)] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/90 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
              {/* This one's only for mobile devices, where sidebar is hiddden regardless of the state */}
              <Button
                variant="ghost"
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>

              {/* This one's only for desktop devices, where sidebar is hidden based on the state */}
              {/* <Button */}
              {/*   variant="ghost" */}
              {/*   type="button" */}
              {/*   className={cn( */}
              {/*     "-m-2.5 hidden p-2.5", */}
              {/*     sidebarHidden && "lg:flex", */}
              {/**/}
              {/*   )} */}
              {/*   onClick={() => setSidebarHidden((prev) => !prev)} */}
              {/* > */}
              {/*   <span className="sr-only">Open sidebar</span> */}
              {/*   <Menu className="h-6 w-6" aria-hidden="true" /> */}
              {/* </Button> */}
              <Text bold variant="text-xl" className="leading-none">
                Guide
              </Text>

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
                  {/* <UserDropdown user={user} /> */}
                </div>
              </div>
            </div>

            <main className="min-h-[calc(100dvh-var(--profile-header-height))] bg-gray-50 py-10">
              {children}
            </main>
          </div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

// This is the sidebar content only
function SidebarContent({
  user,
  setSidebarHidden,
  sidebarHidden,
}: {
  user?: Maybe<TUser>;
  setSidebarHidden: React.Dispatch<SetStateAction<boolean>>;
  sidebarHidden: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="z-[130] flex w-full grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-tertiary px-6 py-10 font-poppins text-white">
      {/* <Button */}
      {/*   variant="ghost" */}
      {/*   type="button" */}
      {/*   className={cn( */}
      {/*     sidebarHidden && "hidden", */}
      {/*     "-m-2.5 w-fit p-2.5 text-gray-100", */}
      {/*   )} */}
      {/*   onClick={() => setSidebarHidden(true)} */}
      {/* > */}
      {/*   <span className="sr-only">Open sidebar</span> */}
      {/*   <Menu className="h-6 w-6" aria-hidden="true" /> */}
      {/* </Button> */}
      <Text variant="text-xl" bold>
        Dashboard
      </Text>

      {/* User details */}
      <li className="mt-auto w-full list-none">
        <div className="flex w-full items-center gap-2 rounded-lg">
          <div className="h-10 max-w-10 overflow-hidden rounded-full">
            <Image
              src={"https://picsum.photos/200/200"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-1 flex-col items-start">
            <Text
              variant="text-sm"
              className="max-w-52 truncate text-gray-100"
              semibold
            >
              {user?.username}
            </Text>
            <Text variant="text-xs" className="max-w-52 truncate text-gray-200">
              {user?.email}
            </Text>
          </div>
        </div>
      </li>
      {/* Navigation links */}
      <nav className="flex w-full flex-1 flex-col">
        <ul role="list" className="flex w-full flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-4">
              {navigations.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname.toString().includes(item.href) &&
                      "bg-white text-black",
                    "flex gap-x-4 rounded-full px-2 py-2 hover:bg-white hover:text-black",
                  )}
                >
                  <item.icon />
                  <p>{item.name}</p>
                </Link>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// type NavigationItemComponentProps = {
//   item: TNavigationItem;
//   pathname: string;
// };

// This is the navigation item component which is used to render the sidebar navigation items and subitems if it has any
// This is the navigation item component which acts as the main link if it doesnt have any subitems. If it has subitems, it will act as the trigger for the accordion
const Item = ({ item, pathname }: any) => {
  return (
    <div
      className={cn(
        pathname === item.href
          ? "rounded-4xl bg-green-50 text-green-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-green-600",
        "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
      )}
    >
      <item.icon
        className={cn(
          pathname === item.href
            ? "text-green-600"
            : "text-gray-500 group-hover:text-green-600",
          "h-5 w-5 shrink-0",
        )}
        aria-hidden="true"
      />
      <p>{item.name}</p>
    </div>
  );
};
