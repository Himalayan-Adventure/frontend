"use client";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogTitle } from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormSchema, TLoginForm } from "@/validators/login-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { login } from "@/server/auth/login-user";
import Logo from "@/components/logo";
import { useCurrentAuthDialog } from "@/store/get-current-auth-dialog";
import {
  ResetPasswordSchema,
  TResetPasswordInput,
} from "@/validators/reset-password";
import { resetPassword } from "@/server/auth/reset-password";
import { WiDirectionDown } from "react-icons/wi";
export const ResetPasswordForm = ({ code }: { code: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { type, setType, setDialogOpen } = useCurrentAuthDialog();
  const router = useRouter();
  const form = useForm<TResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      code: code,
      passwordConfirmation: "",
    },
  });
  async function onSubmit(values: TResetPasswordInput) {
    const payload = form.getValues();
    const res = await resetPassword({
      code: code,
      passwordConfirmation: payload.passwordConfirmation,
      password: payload.password,
    });
    if (res.status === 200) {
      toast.success("Successfully reset password! Please login ");
      router.push("/");
    } else {
      toast.error(`${res?.error?.error?.message}`);
    }
  }
  return (
    <div className="relative z-10 max-w-4xl rounded-lg bg-white p-4 shadow-xl">
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          Reset Password
        </Text>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">Password</FormLabel>
                <FormControl>
                  <FormControl>
                    <div className="relative">
                      <div className="relative flex w-full flex-col">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                          className=""
                        />
                        <Button
                          type="button"
                          tabIndex={-1}
                          aria-label="Toggle see password"
                          variant="ghost"
                          className="absolute right-4 top-1/2 -translate-y-1/2 transform p-0 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <p
                        className="relative -bottom-2 w-fit cursor-pointer text-xs hover:underline"
                        onClick={() => setType("forgot-pwd")}
                      >
                        Forgot password?
                      </p>
                    </div>
                  </FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">Confirm password</FormLabel>
                <FormControl>
                  <FormControl>
                    <div className="relative">
                      <div className="relative flex w-full flex-col">
                        <Input
                          type={showCPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                          className=""
                        />
                        <Button
                          type="button"
                          tabIndex={-1}
                          aria-label="Toggle see password"
                          variant="ghost"
                          className="absolute right-4 top-1/2 -translate-y-1/2 transform p-0 text-gray-400"
                          onClick={() => setShowCPassword(!showPassword)}
                        >
                          {showCPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="w-full self-end bg-foreground px-10 py-6 font-poppins font-bold"
            >
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
