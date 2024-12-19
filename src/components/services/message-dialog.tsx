"use client";

import { useGuideDialog } from "@/store/get-guide-dialog-type";
import { TUserDeep } from "@/types/auth";
import { InquiryFormSchema, TInquiryForm } from "@/validators/inquiry-form";
import { Text } from "../ui/text";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addInquiry } from "@/server/inquiry/write-inquiry";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
export const MessageDialog = ({ guideId }: { guideId: number }) => {
  const { type, setType, setDialogOpen } = useGuideDialog();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<TInquiryForm>({
    resolver: zodResolver(InquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      guide: guideId,
    },
  });
  async function onSubmit(values: TInquiryForm) {
    setLoading(true);
    const payload = form.getValues();
    const res = await addInquiry(payload);
    if (res.status === 200) {
      setLoading(false);
      setType("details");
      toast.success("Successfully sent a message!");
    } else {
      setLoading(false);
      toast.error(`${res?.error?.message}`);
    }
  }
  return (
    <div className="relative">
      <Text className="w-full text-center" variant={"text-md"}>
        Leave a message
      </Text>
      <Form {...form}>
        <form
          className="space-y-3 text-black md:space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label required className="text-white">
                  Name
                </Label>
                <FormControl>
                  <Input placeholder="John Doe" {...field} required />
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
                <Label required className="text-white">
                  Email
                </Label>
                <FormControl>
                  <Input placeholder="john.doe@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label required className="text-white">
                  Phone
                </Label>
                <FormControl>
                  <PhoneInput
                    defaultCountry="NP"
                    initialValueFormat="national"
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <Label required className="text-white">
                  Subject
                </Label>
                <FormControl>
                  <Input placeholder="e.g. Guide session" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <Label required className="text-white">
                  Message
                </Label>
                <FormControl>
                  <Textarea {...field} placeholder="Your message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-8 flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              isLoading={loading}
              type="submit"
              //disabled={!form.formState.isValid}
              className="w-full gap-x-3 self-end !bg-white px-10 py-4 font-poppins font-bold text-foreground sm:py-6"
            >
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
