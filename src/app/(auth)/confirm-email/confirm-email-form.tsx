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
import { resetPassword } from "@/server/auth/reset-password";
import { z } from "zod";
import { confirmEmail } from "@/server/auth/confirm-email";

export const ConfirmEmailSchema = z.object({
  email: z.string().email().min(5, { message: "Email is required" }),
});

export type TConfirmEmailInput = z.infer<typeof ConfirmEmailSchema>;
export const ConfirmEmailForm = () => {
  const router = useRouter();
  const form = useForm<TConfirmEmailInput>({
    resolver: zodResolver(ConfirmEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: TConfirmEmailInput) {
    const payload = form.getValues();
    const res = await confirmEmail(payload.email);
    if (res.status === 200) {
      toast.success("Send confirmation link! Please check email");
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
            Confirm email
        </Text>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">Email</FormLabel>
                <FormControl>
                  <FormControl>
                    <div className="relative">
                      <div className="relative flex w-full flex-col">
                        <Input
                          type="email"
                          placeholder="john.doe@gmail.com"
                          {...field}
                          className=""
                        />
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
              Send email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
