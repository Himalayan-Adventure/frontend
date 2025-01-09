"use client";

import { useGuideDialog } from "@/store/get-guide-dialog-type";
import { TUserDeep } from "@/types/auth";
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
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { writeQuote } from "@/server/quotes/write-quote";
import { QuoteFormSchema, TQuoteForm } from "@/validators/quotes-form";
import { DialogContent } from "../ui/dialog";

import EverestImg from "/public/images/everest.png";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user-current-user";
export const QuotesDialog = ({
  packageId,
  title,
}: {
  packageId?: number;
  title?: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<TQuoteForm>({
    resolver: zodResolver(QuoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      package: packageId,
      //      guide: guideId,
    },
  });
  async function onSubmit(values: TQuoteForm) {
    setLoading(true);
    const payload = form.getValues();
    const res = await writeQuote(payload);
    if (res.status === 200) {
      setLoading(false);
      toast.success("Successfully sent a quote!");
    } else {
      setLoading(false);
      toast.error(`${res?.error?.message}`);
    }
  }
  return (
    <DialogContent className="rounded-2xl bg-black font-poppins text-white">
      <Image
        src={EverestImg}
        alt="Cover image"
        className="absolute -z-10 h-full w-full object-cover opacity-90"
      />
      <Text className="w-full text-center" variant={"text-lg"} semibold>
        {title || "Write a quote"}
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
              className="w-full gap-x-3 self-end px-10 py-4 font-poppins font-bold sm:py-6"
            >
              Send
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
