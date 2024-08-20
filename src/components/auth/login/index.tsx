import { Button } from "@/components/ui/button";
import { FaRegUser as UserIcon } from "react-icons/fa";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, ChevronLeft } from "lucide-react";
import Logo from "@/components/logo";
export const LoginCard = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="[&>*]:font-poppins grid h-full w-full max-w-none !rounded-2xl p-4 sm:h-auto sm:w-[90vw] sm:p-8 md:w-[90vw] md:p-16 xl:w-fit">
      <Logo theme="light" />
      {/* <DialogClose className="top-0" /> */}
      <span className="absolute left-4 top-4 cursor-pointer sm:left-8">
        <ArrowLeft strokeWidth={3} />
      </span>
      <div className="sm:mt-none mt-14 space-y-2 sm:space-y-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="font-poppins text-left font-bold capitalize sm:text-center"
        >
          Login
        </Text>
      </div>
      <div className="flex flex-row justify-center sm:justify-center">
        <Button
          type="submit"
          className="font-poppins w-3/4 max-w-[350px] self-end bg-foreground px-10 py-8 font-bold sm:w-1/2 sm:py-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
