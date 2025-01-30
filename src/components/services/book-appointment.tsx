"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useCurrentUser } from "@/hooks/user-current-user";
import { cn, getDateBounds } from "@/lib/utils";
import { makeAppointment } from "@/server/appointments/post-appointment";
import { useGuideDialog } from "@/store/get-guide-dialog-type";
import { TUser, TUserDeep } from "@/types/auth";
import { APIResponseCollection } from "@/types/types";
import {
  BookAppointmentFormSchema,
  TBookAppointmentSchemaProvider,
} from "@/validators/book-appointment-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { addDays, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import qs from "qs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./appointments-popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import { Textarea } from "../ui/textarea";
export const AppointmentDialog = ({
  guide,
  loggedInUser,
}: {
  guide: TUserDeep;
  loggedInUser: TUser;
}) => {
  const { setType } = useGuideDialog();
  const [loading, setLoading] = useState(false);
  const form = useForm<TBookAppointmentSchemaProvider>({
    resolver: zodResolver(BookAppointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      expectation: "",
      appointment_date: new Date(),
      guide: guide.id,
      requested_by: loggedInUser?.id,
    },
  });

  const [date, setDate] = useState<Date>();
  const [activeTime, setActiveTime] = useState(0);
  useEffect(() => {
    setActiveTime(0);
  }, [date]);

  const { data: availableTime, isLoading } = useQuery<
    APIResponseCollection<"api::calendar.calendar">
  >({
    queryKey: [
      "calendars",
      `guide-calendar-${guide.id}`,
      date,
      form.watch("appointment_date"),
    ],
    queryFn: async () => {
      const { start, end } = getDateBounds(
        form.getValues("appointment_date").toString(),
      );
      try {
        const query = qs.stringify({
          filters: {
            guides: {
              id: guide.id,
            },
            is_available: true,
            $and: [
              {
                start_date: {
                  $lte: end, // Calendar starts before or at end of the day
                },
              },
              {
                end_date: {
                  $gte: start, // Calendar ends after or at start of the day
                },
              },
            ],
          },
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/calendars?${query}`,
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    placeholderData: keepPreviousData,
  });
  async function onSubmit(values: TBookAppointmentSchemaProvider) {
    console.log("I am clcking");
    if (!loggedInUser) {
      toast.error("Please login to book an appointment");
      return;
    }
    setLoading(true);
    const appointment_date = availableTime?.data.find(
      (i) => i.id === activeTime,
    )?.attributes.start_date;
    if (!appointment_date) {
      setLoading(false);
      toast.success("Appointment date is invalid");
      return;
    }
    const payload = {
      ...form.getValues(),
      appointment_date: new Date(appointment_date),
      requested_by: loggedInUser?.id,
    };
    const res = await makeAppointment(payload);
    if (res.status === 200) {
      setLoading(false);
      setType("details");
      toast.success("Successfully made an appointment!");
    } else {
      setLoading(false);
      toast.error(`${res?.error?.message}`);
    }
  }
  return (
    <div className="relative space-y-4">
      <Text className="w-full text-center" variant={"text-md"}>
        Book an appointment
      </Text>
      <Form {...form}>
        <form
          className="space-y-3 text-black md:space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="appointment_date"
            render={({ field }) => (
              <FormItem className="relative z-50">
                <Label className="text-white" required>
                  Date
                </Label>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Select
                        onValueChange={(value) =>
                          setDate(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Quick select options" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="z-[10000]"
                        disabled={(date) =>
                          date < subDays(new Date(), 1) ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="expectation"
            render={({ field }) => (
              <FormItem>
                <Label required className="text-white">
                  Expectation
                </Label>
                <FormControl>
                  <Textarea {...field} placeholder="Your expectation" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <Label required className="font-black text-white">
              Available Time SLots
            </Label>
            {availableTime?.data && availableTime?.data?.length > 0 ? (
              <span className="flex flex-wrap items-center gap-x-2">
                {availableTime?.data.map((time) => (
                  <Badge
                    onClick={() => setActiveTime(time.id)}
                    className={cn(
                      time.id === activeTime
                        ? "bg-primary text-white"
                        : "bg-white text-black",
                      "cursor-pointer rounded-full font-bold transition ease-linear hover:bg-primary hover:text-white",
                    )}
                    key={`availabletime-${time.id}`}
                  >
                    {format(new Date(time.attributes.start_date), "h:mm aa")}
                  </Badge>
                ))}
              </span>
            ) : isLoading ? (
              <Skeleton className="flex flex-row gap-x-2 bg-background/10">
                <Skeleton className="h-10 w-24 rounded-full bg-primary/10" />
                <Skeleton className="h-10 w-24 rounded-full bg-primary/10" />
                <Skeleton className="h-10 w-24 rounded-full bg-primary/10" />
              </Skeleton>
            ) : (
              <Text variant="text-sm" className="italic text-yellow-500">
                No time slots available, select another date
              </Text>
            )}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              isLoading={loading}
              type="submit"
              disabled={!activeTime}
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
