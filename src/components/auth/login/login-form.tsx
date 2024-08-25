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
import { login } from "@/server/login-user";
import Logo from "@/components/logo";
export const LoginForm = ({
  setIsOpen,
  setForgotPwd,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setForgotPwd: React.Dispatch<SetStateAction<boolean>>;
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
  return (
    <>
      <Logo theme="light" className="h-12 object-cover" />
      <div className="my-4 [&>*]:text-neutral-900">
        <DialogTitle>
          <Text
            variant="display-sm"
            className="font-poppins text-left !text-xl font-bold capitalize sm:!text-2xl"
          >
            Login
          </Text>
        </DialogTitle>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
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
                        onClick={() => setForgotPwd(true)}
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

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="font-poppins w-full self-end bg-foreground px-10 py-6 font-bold"
            >
              Login
            </Button>
            <Text
              variant="text-sm"
              className="cursor-pointer text-center hover:underline"
              bold
            >
              Not a user? Register!
            </Text>
          </div>
        </form>
      </Form>
    </>
  );
};
