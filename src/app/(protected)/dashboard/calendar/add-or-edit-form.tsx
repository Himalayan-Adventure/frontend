"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "./_styles/date-picker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { Switch } from "@/components/ui/switch";
import DateTimePicker from "react-datetime-picker";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoBackButton } from "@/components/profile/go-back-button";
import { APIResponse } from "@/types/types";
import {
  CalendarFormSchema,
  TCalendarForm,
} from "@/validators/calendar-validator";
import { addCalendar } from "@/server/calendar/add-calendar";
import { editCalendar } from "@/server/calendar/edit-calendar";
import { TUser } from "@/types/auth";
type CalendarAddOrEditProps =
  | { type: "add"; data?: never; id?: never; user: TUser }
  | {
      type: "edit";
      data: APIResponse<"api::calendar.calendar">;
      id: number;
      user?: never;
    };
export const CalendarAddOrEditForm = ({
  type,
  user,
  data,
  id,
}: CalendarAddOrEditProps) => {
  const { start_date, end_date, is_available, notes, heading, guide } =
    data?.data?.attributes || {};
  const calendar: TCalendarForm = {
    start_date: start_date ? new Date(start_date) : new Date(),
    end_date: end_date ? new Date(end_date) : new Date(),
    is_available: is_available || false,
    heading: heading,
    notes: notes,
    guide: guide?.data?.id || user?.id,
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TCalendarForm>({
    resolver: zodResolver(CalendarFormSchema),
    defaultValues: calendar,
  });

  async function onSubmit(values: TCalendarForm) {
    setLoading(true);
    const payload = {
      ...form.getValues(),
    };
    if (type === "edit") {
      const res = await editCalendar(payload, id);
      if (res.status === 200) {
        toast.success("Calendar updated successfully");
        router.refresh();
        router.back();
      }
    } else {
      const res = await addCalendar(payload);
      if (res.status === 200) {
        toast.success("Added calendar successfully");
        router.refresh();
        router.back();
      }
    }
    setLoading(false);
  }
  return (
    <section className="container max-w-4xl">
      <GoBackButton className="my-5" />
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          {type} calendar
        </Text>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    className={"w-full"}
                    amPmAriaLabel="Select AM/PM"
                    format="y-MM-dd h:mm a"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    className={"w-full"}
                    amPmAriaLabel="Select AM/PM"
                    format="y-MM-dd h:mm a"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_available"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Available</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heading</FormLabel>
                <FormControl>
                  <Input placeholder="Enter heading..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Add notes..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              onClick={() => {
                form.handleSubmit(onSubmit);
              }}
              className="w-fit items-center gap-x-3 self-start rounded-full bg-foreground px-10 py-6 font-poppins font-bold"
              isLoading={loading}
            >
              Done
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
