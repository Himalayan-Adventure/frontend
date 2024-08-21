"use client";
import { Button } from "@/components/ui/button";
import { FaRegUser as UserIcon } from "react-icons/fa";
import { Text } from "@/components/ui/text";
import { DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
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
import { ArrowLeft, Check, ChevronLeft } from "lucide-react";
import Logo from "@/components/logo";
import { useForm } from "react-hook-form";
import { LoginFormSchema, TLoginForm } from "@/validators/login-validator";
import { zodResolver } from "@hookform/resolvers/zod";
export const LoginCard = () => {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <DialogContent className="[&>*]:font-poppins !flex h-full w-full max-w-none flex-col justify-between !rounded-2xl p-4 sm:h-auto sm:w-[90vw] sm:p-8 md:w-[90vw] md:px-16 md:py-12 xl:w-fit">
      <div>
        <Logo theme="light" className="h-12 object-cover" />
        {/* <DialogClose className="top-0" /> */}
        {/* <span className="absolute left-4 top-4 cursor-pointer sm:left-8"> */}
        {/*   <ArrowLeft strokeWidth={3} /> */}
        {/* </span> */}
        <div className="my-4 [&>*]:text-neutral-900">
          <Text
            variant="display-sm"
            className="font-poppins text-left font-bold capitalize"
          >
            Login
          </Text>
        </div>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <span className="relative top-2 cursor-pointer text-[12px] transition-colors ease-in hover:text-primary hover:underline">
                    Forgot Password?
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="mt-8 flex flex-row justify-center sm:justify-center">
        <Button
          type="submit"
          className="font-poppins w-full self-end bg-foreground px-10 py-6 font-bold"
        >
          Login
        </Button>
      </div>
    </DialogContent>
  );
};
