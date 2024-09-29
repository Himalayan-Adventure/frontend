import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { FaRegUser as UserIcon } from "react-icons/fa";
import { Text } from "../ui/text";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, ChevronLeft } from "lucide-react";
import { useCurrentAuthDialog } from "@/store/get-current-auth-dialog";
export const ChooseAccType = () => {
  const userTypes = [
    {
      id: 1,
      name: "Customer",
      desc: "Travelers/ Adventurers/ Mountaineers/ Visitors",
    },
    {
      id: 2,
      name: "Guides",
      desc: " Travel, Tour and Expedition Guides",
    },
  ];

  const { type, setType, setDialogOpen, setUserType } = useCurrentAuthDialog();
  const [active, setActive] = useState(0);
  return (
    <DialogContent className="grid h-full w-full max-w-none !rounded-2xl p-4 sm:h-auto sm:w-[90vw] sm:p-8 md:w-[90vw] md:p-16 xl:w-fit [&>*]:font-poppins">
      {/* <DialogClose className="top-0" /> */}
      <span className="absolute left-4 top-4 cursor-pointer sm:left-8">
        <ArrowLeft strokeWidth={3} />
      </span>
      <DialogHeader className="sm:mt-none mt-14 space-y-2 sm:space-y-4 [&>*]:text-neutral-900">
        <DialogTitle>
          <Text
            variant="display-sm"
            className="text-left font-poppins font-bold capitalize sm:text-center"
          >
            Choose account type
          </Text>
        </DialogTitle>
        <DialogDescription className="text-left sm:text-center">
          Choose your account type according to your preference.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-5 flex grid-rows-2 flex-col gap-x-10 gap-y-4 py-4 sm:grid md:grid-cols-2 md:grid-rows-1">
        {userTypes.map((userType) => (
          <div
            key={userType.name}
            className={cn(
              active === userType.id
                ? "border-neutral-800 bg-orange-50"
                : "border-neutral-400",
              "relative grid h-fit cursor-pointer grid-cols-[15%_auto] items-start gap-x-2 rounded-3xl border p-5 sm:h-full",
            )}
            onClick={() => setActive(userType.id)}
          >
            <span
              className={cn(
                active === userType.id ? "bg-white" : "bg-gray-100",
                "w-fit rounded-full p-2",
              )}
            >
              <UserIcon size={18} />
            </span>
            <span className="space-y-1">
              <Text variant="text-lg" className="font-poppins" semibold>
                {userType.name}
              </Text>
              <Text variant="text-md">{userType.desc}</Text>
            </span>
            <span
              className={cn(
                active !== userType.id
                  ? "border-neutral-500"
                  : "border-black bg-black text-white",
                "absolute right-5 top-5 flex size-6 items-center justify-center rounded-full border tracking-tight transition-all ease-in-out",
              )}
            >
              {active === userType.id && (
                <Check size={14} className="text-white" />
              )}
            </span>
          </div>
        ))}
      </div>
      <DialogFooter className="flex-row justify-center sm:justify-center">
        <Button
          type="submit"
          className="w-3/4 max-w-[350px] self-end bg-foreground px-10 py-8 font-poppins font-bold sm:w-1/2 sm:py-6"
          onClick={() => {
            setType("register");
            setUserType(active === 0 ? "customer" : "merchant");
          }}
        >
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
