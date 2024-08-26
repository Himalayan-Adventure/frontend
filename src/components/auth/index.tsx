import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ForgotPasswordDialog } from "./forgot-password";
import { LoginForm } from "./login-form";
import {
  TAuthDialogType,
  useCurrentAuthDialog,
} from "@/store/get-current-auth-dialog";
import { RegisterCard } from "./register-form";
import { OtpForm } from "./opt-form";
import Logo from "@/components/logo";
import { ArrowLeft } from "lucide-react";
export const AuthCard = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { type, setType } = useCurrentAuthDialog();

  const typeMap: { [key in TAuthDialogType]: React.ReactNode } = {
    login: <LoginForm />,
    register: <RegisterCard />,
    "forgot-pwd": <ForgotPasswordDialog />,
    otp: <OtpForm />,
  };

  return (
    <DialogContent
      className={cn(
        type === "forgot-pwd" || type === "otp"
          ? "h-fit w-[95vw] !pt-12 sm:h-fit"
          : "h-auto w-[95vw] md:w-fit",
        "!flex flex-col justify-between !rounded-2xl p-4 font-poppins sm:h-auto sm:p-8 md:px-20 md:py-12",
      )}
    >
      {/* Back button*/}
      <span
        className={cn(
          type === "otp" || type === "forgot-pwd" ? "" : "hidden",
          "absolute left-4 top-4 cursor-pointer sm:left-8",
        )}
        onClick={() =>
          type === "otp" ? setType("forgot-pwd") : setType("login")
        }
      >
        <ArrowLeft strokeWidth={3} />
      </span>

      <DialogClose onClick={() => setIsOpen(false)} />

      <Logo theme="light" className="h-12 object-cover" />
      <div>{typeMap[type] || [typeMap.login]}</div>
    </DialogContent>
  );
};
