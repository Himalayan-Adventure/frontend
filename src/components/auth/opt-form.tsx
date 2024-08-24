import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
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

import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Text } from "../ui/text";
import { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Logo from "../logo";
export const OtpForm = ({
  setCurStep,
}: {
  setCurStep: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <DialogHeader className="mt-4 space-y-1 [&>*]:text-neutral-900">
        <DialogTitle>
          <Text
            variant="display-sm"
            className="font-poppins text-left !text-xl font-bold capitalize sm:!text-2xl"
          >
            Enter Code
          </Text>
        </DialogTitle>
        <DialogDescription className="text-left font-semibold">
          We&apos;ve sent an activation code to your registered email and mobile
          number
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 flex flex-col gap-x-10 gap-y-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <DialogFooter className="mt-8 flex-row justify-start sm:justify-start">
        <Button
          type="submit"
          className="font-poppins w-full self-end bg-foreground px-10 py-3 font-bold sm:py-6"
        >
          Continue
        </Button>
      </DialogFooter>
    </>
  );
};
