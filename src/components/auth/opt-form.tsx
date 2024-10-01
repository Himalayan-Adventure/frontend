import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "../ui/text";
import Link from "next/link";

export const OtpForm = () => {
  return (
    <>
      <DialogHeader className="mt-4 space-y-1 [&>*]:text-neutral-900">
        <DialogTitle>
          <Text
            variant="display-sm"
            className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
          >
            Check gmail
          </Text>
        </DialogTitle>
        <DialogDescription className="text-left text-[13px] font-semibold">
          We&apos;ve sent an activation link to your registered email
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 flex hidden flex-col gap-x-10 gap-y-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup className="justify-between gap-x-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <DialogFooter className="mt-8 flex-row justify-start sm:justify-start">
        <Link href="https://mail.google.com/" target="_blank" className="w-full">
          <Button
            // type="submit"
            className="w-full self-end bg-foreground px-10 py-3 font-poppins font-bold sm:py-6"
          >
            Check
          </Button>
        </Link>
      </DialogFooter>
    </>
  );
};
