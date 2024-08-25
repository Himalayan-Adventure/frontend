import { Button } from "@/components/ui/button";
import { FaRegUser as UserIcon } from "react-icons/fa";
import { Text } from "@/components/ui/text";
import { DialogContent, DialogOverlay } from "@/components/ui/dialog";
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
import {
  RegisterFormSchema,
  TRegisterForm,
} from "@/validators/register-validator";
import Link from "next/link";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { register } from "@/server/register-user";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
export const RegisterCard = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      number: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [termsChecked, setTermsChecked] = useState<CheckedState>(false);
  async function onSubmit(values: TRegisterForm) {
    const payload = form.getValues();
    const res = await register({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      number: payload.number,
    });
    if (res.status === 200) {
      toast.success("Successfully registered!");
      setIsOpen(false);
    } else {
      console.log(res.error);
      toast.error(`${res.error}`);
    }
    router.refresh();
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  return (
    <>
      <DialogOverlay onClick={() => setIsOpen(false)} />
      <DialogContent className="[&>*]:font-poppins !flex h-full w-full max-w-none flex-col justify-between overflow-auto !rounded-2xl p-4 sm:h-auto sm:w-[90vw] sm:p-8 md:w-[90vw] md:px-16 md:py-12 xl:w-fit">
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
              Sign up
            </Text>
          </div>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="NP"
                        placeholder="977 **********"
                        {...field}
                        value={field.value as any}
                      />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <FormControl>
                        <div className="relative flex w-full flex-col">
                          <Input
                            type={showConfPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            {...field}
                            className=""
                          />
                          <Button
                            type="button"
                            tabIndex={-1}
                            aria-label="Toggle see password"
                            variant="ghost"
                            className="absolute right-4 top-1/2 -translate-y-1/2 transform p-0 text-gray-400"
                            onClick={() =>
                              setShowConfPassword(!showConfPassword)
                            }
                          >
                            {showConfPassword ? (
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
              <Text variant="text-sm" className="text-center text-sm">
                By creating an account or signing you agree to our{" "}
                <Link href="/" className="w-fit font-bold underline">
                  Terms and Conditions
                </Link>
              </Text>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={termsChecked}
                  onCheckedChange={(e) => setTermsChecked(e)}
                  id="terms"
                  className="h-5 w-5 rounded-full"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the terms and privacy policy
                </label>
              </div>
              <div className="mt-8 flex flex-row justify-center sm:justify-center">
                <Button
                  type="submit"
                  disabled={!termsChecked || !form.formState.isValid}
                  className="font-poppins w-full self-end bg-foreground px-10 py-8 font-bold sm:py-6"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </>
  );
};
