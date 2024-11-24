"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Text } from "../ui/text";
import { TUser, TUserDeep } from "@/types/auth";
import EverestImg from "/public/images/everest.png";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

export const GuideCard = ({ user }: { user: TUserDeep }) => {
  const [showCard, setShowCard] = useState(false);
  return (
    <Dialog>
      <DialogTrigger
        className="group rounded-tr-[43px] bg-neutral-100 pb-2 pl-2 pr-4 pt-4 text-center font-poppins transition-all ease-in-out hover:bg-primary"
        onClick={() => setShowCard(!showCard)}
      >
        {user.profilePicture && (
          <Image
            src={user.profilePicture.url}
            width={user.profilePicture.width}
            height={user.profilePicture.height}
            alt={user.profilePicture.name || user.username + " profile picture"}
            className="aspect-square rounded-tr-[35px] object-cover"
          />
        )}
        <div className="flex flex-col py-8">
          <Text
            variant={"text-lg"}
            className="font-extrabold capitalize group-hover:text-background"
          >
            {user.username}
          </Text>
          <span className="flex flex-col gap-y-2">
            <Text
              variant={"text-sm"}
              className="capitalize group-hover:text-background"
            >
              Trekker
            </Text>

            <Text
              variant={"text-sm"}
              className="capitalize group-hover:text-background"
            >
              Extreme Adventure
            </Text>
          </span>
        </div>
      </DialogTrigger>
      <GuideCardOverlay user={user} setShowCard={setShowCard} />
    </Dialog>
  );
};
const GuideCardOverlay = ({
  user,
  setShowCard,
}: {
  user: TUserDeep;
  setShowCard: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <DialogContent className="rounded-3xl bg-black py-10 font-poppins text-white sm:rounded-3xl lg:py-20 lg:pb-48">
      {/*Overlay image*/}
      <Image
        src={EverestImg}
        alt="Cover image"
        className="absolute -z-10 h-full w-full object-cover opacity-90"
      />
      <div className="flex flex-col place-items-center gap-y-8">
        {user.profilePicture && (
          <Image
            src={user.profilePicture.url}
            width={user.profilePicture.width}
            height={user.profilePicture.height}
            alt={user.profilePicture.name || user.username + " profile picture"}
            className="aspect-square size-24 rounded-full border-2 border-primary object-cover"
          />
        )}
        <Text variant="text-md">{user?.username}</Text>
      </div>
      <div className="relative space-y-8">
        <span className="flex items-center gap-3">
          <Text variant="text-sm" bold>
            Date of birth
          </Text>
          <Button className="bg-white text-black hover:bg-white/80">
            Jaunuary 18, 1888
          </Button>
        </span>
        <Text variant="text-sm">
          Aenean posuere tortor sed cursus Aenean posuere tortor sed cursus
          Aenean posuere tortor sed cursus
        </Text>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[auto_14px_auto]">
            <Text variant="text-sm">Service Provided</Text>
            <Text variant="text-sm">:</Text>
            <Text variant="text-sm">Lorem</Text>
          </div>
          <div className="grid grid-cols-[auto_14px_auto]">
            <Text variant="text-sm">Service Provided</Text>
            <Text variant="text-sm">:</Text>
            <Text variant="text-sm">Lorem</Text>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Link href={`/profile/${user.id}`}>
            <Button className="w-full rounded-xl">Full Profile</Button>
          </Link>
          <Button className="w-full rounded-xl">Message</Button>
          <Button className="w-full rounded-xl bg-white text-black">
            Book an appointment
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
