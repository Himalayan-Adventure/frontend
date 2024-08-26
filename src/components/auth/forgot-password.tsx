import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Text } from "../ui/text";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ForgotPwdEmailFormSchema,
  ForgotPwdNumberFormSchema,
  TForgotPwdEmailInput,
  TForgotPwdNumberInput,
} from "@/validators/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentAuthDialog } from "@/store/get-current-auth-dialog";
export const ForgotPasswordDialog = () => {
  const [method, setMethod] = useState<"email" | "number">("email");
  const { setType } = useCurrentAuthDialog();
  const emailForm = useForm<TForgotPwdEmailInput>({
    resolver: zodResolver(ForgotPwdEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const numberForm = useForm<TForgotPwdNumberInput>({
    resolver: zodResolver(ForgotPwdNumberFormSchema),
    defaultValues: {
      number: "",
    },
  });
  function onEmailSubmit() {
    const payload = emailForm.getValues();
    setType("otp");
    toast.success(`Email submitted`);
  }

  function onNumberSubmit() {
    const payload = numberForm.getValues();
    setType("otp");
    toast.success(`Number submitted`);
  }
  return (
    <>
      <DialogHeader className="mt-4 space-y-1 [&>*]:text-neutral-900">
        <DialogTitle>
          <Text
            variant="display-sm"
            className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
          >
            Forgot Password
          </Text>
        </DialogTitle>
        <DialogDescription className="text-left text-[13px] font-semibold">
          Please enter your {method}
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 flex flex-col gap-x-10 gap-y-4">
        {method === "email" ? (
          <Form {...emailForm}>
            <form
              className="space-y-8"
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@email.com" {...field} />
                    </FormControl>
                    <p
                      className="w-fit cursor-pointer hover:underline"
                      onClick={() => setMethod("number")}
                    >
                      Use phone instead?
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-8 flex-row justify-start sm:justify-start">
                <Button
                  disabled={!emailForm.formState.isValid}
                  type="submit"
                  className="w-full self-end bg-foreground px-10 py-3 font-poppins font-bold sm:py-6"
                >
                  Continue
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Form {...numberForm}>
            <form
              className="space-y-8"
              onSubmit={numberForm.handleSubmit(onNumberSubmit)}
            >
              <FormField
                control={numberForm.control}
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

                    <p
                      className="w-fit cursor-pointer hover:underline"
                      onClick={() => setMethod("email")}
                    >
                      Use email instead?
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-8 flex-row justify-start sm:justify-start">
                <Button
                  // disabled={!numberForm.formState.isValid}
                  type="submit"
                  className="w-full self-end bg-foreground px-10 py-3 font-poppins font-bold sm:py-6"
                >
                  Continue
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </div>
    </>
  );
};
