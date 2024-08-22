import { Button } from "@/components/ui/button";
import { FaRegUser as UserIcon } from "react-icons/fa";
import { Text } from "@/components/ui/text";
import {
  DialogClose,
  DialogContent,
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
  function onSubmit(values: TLoginForm) {
    toast.success("Successfully logged in!");
    router.refresh();
    setIsOpen(false);
  }
  return (
    <DialogContent className="[&>*]:font-poppins !flex h-full w-full max-w-none flex-col justify-between !rounded-2xl p-4 sm:h-auto sm:w-[90vw] sm:p-8 md:w-[90vw] md:px-16 md:py-12 xl:w-fit">
      <DialogClose onClick={() => setIsOpen(false)} />
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
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormLabel className="capitalize">Password</FormLabel>
                  <FormControl>
                    <FormControl>
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
                    </FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-8 flex flex-row justify-center sm:justify-center">
              <Button
                type="submit"
                className="font-poppins w-full self-end bg-foreground px-10 py-6 font-bold"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
