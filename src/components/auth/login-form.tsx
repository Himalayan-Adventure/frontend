import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { login } from "@/server/auth/login-user";
import { useCurrentAuthDialog } from "@/store/get-current-auth-dialog";
import { LoginFormSchema, TLoginForm } from "@/validators/login-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { type, setType, setDialogOpen } = useCurrentAuthDialog();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: TLoginForm) {
    setLoading(true);
    const payload = form.getValues();
    const res = await login({
      email: payload.email,
      password: payload.password,
    });
    if (res.status === 200) {
      setLoading(false);
      toast.success("Successfully logged in!");
      router.refresh();
      if (window) {
        window.location.reload();
      }
      router.push("/");
      // setDialogOpen(false);
    } else {
      setLoading(false);
      if (
        res?.error?.error?.message === "Your account email is not confirmed"
      ) {
        router.push("/confirm-email");
      }
      toast.error(`${res?.error?.error?.message}`);
    }
  }
  return (
    <>
      <div className="my-4 [&>*]:text-neutral-900">
        <DialogTitle>
          <Text
            variant="display-sm"
            className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
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

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="w-full items-center gap-x-3 self-end bg-foreground px-10 py-6 font-poppins font-bold"
            >
              Login
              {loading && (
                <Oval
                  height="16"
                  width="16"
                  color="#FD9100"
                  ariaLabel="oval-loading"
                />
              )}
            </Button>
            <Text
              variant="text-sm"
              className="cursor-pointer text-center hover:underline"
              onClick={() => setType("select-user")}
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
