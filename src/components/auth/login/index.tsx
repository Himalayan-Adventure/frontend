"use client";
import { Button } from "@/components/ui/button";
import { FaRegUser as UserIcon } from "react-icons/fa";
import { Text } from "@/components/ui/text";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { SetStateAction, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, ChevronLeft, Eye, EyeOffIcon } from "lucide-react";
import Logo from "@/components/logo";
import { useForm } from "react-hook-form";
import { LoginFormSchema, TLoginForm } from "@/validators/login-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { login } from "@/server/login-user";
import { LoginForm } from "./login-form";
import { ForgotPasswordDialog } from "../forgot-password";
export const LoginCard = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: TLoginForm) {
    const payload = form.getValues();
    const res = await login({
      email: payload.email,
      password: payload.password,
    });
    if (res.status === 200) {
      toast.success("Successfully logged in!");
      setIsOpen(false);
      router.refresh();
    } else {
      console.log(res.error);
      toast.error(`${res.error}`);
    }
  }
  const [forgotPwd, setForgotPwd] = useState(false);
  return (
    <DialogContent
      className={cn(
        !forgotPwd
          ? "h-auto w-[95vw] md:w-fit"
          : "h-fit w-[95vw] !pt-12 sm:h-fit",
        "[&>*]:font-poppins !flex flex-col justify-between !rounded-2xl p-4 sm:h-auto sm:p-8 md:px-20 md:py-12",
      )}
    >
      <DialogClose onClick={() => setIsOpen(false)} />
      <div>
        {/* <Logo theme="light" className="h-12 object-cover" /> */}
        {/* <div className="my-4 [&>*]:text-neutral-900"> */}
        {/*   <DialogTitle> */}
        {/*     <Text */}
        {/*       variant="display-sm" */}
        {/*       className="font-poppins text-left !text-xl font-bold capitalize sm:!text-2xl" */}
        {/*     > */}
        {/*       {!forgotPwd ? "Login" : "Forgot Password"} */}
        {/*     </Text> */}
        {/*   </DialogTitle> */}
        {/* </div> */}
        {!forgotPwd ? (
          <LoginForm setIsOpen={setIsOpen} setForgotPwd={setForgotPwd} />
        ) : (
          <ForgotPasswordDialog setForgotPwd={setForgotPwd} />
        )}
      </div>
    </DialogContent>
  );
};
