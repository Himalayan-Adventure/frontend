"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useState } from "react";
import qs from "qs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage as RawFormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./select-outline";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { m, domMax, LazyMotion } from "framer-motion";
import { Text } from "../ui/text";
import {
  BookAppointmentFormSchema,
  TBookAppointmentSchemaProvider,
} from "@/validators/book-appointment-validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeAppointment } from "@/server/appointments/post-appointment";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIResponseCollection } from "@/types/types";
import { format, subDays } from "date-fns";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { capitalize, cn, getDateBounds, truncate } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import {
  CalendarIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import { TUser } from "@/types/auth";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/user-current-user";
import ExpertsImage from "/public/images/experts.png";
import Clouds from "/public/images/cloudup.png";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Loading } from "../loading";
const CloudImage = ({ position }: { position: string }) => (
  <div className={`absolute ${position} w-full brightness-100`}>
    <Image
      src={Clouds}
      alt="cloud"
      className="relative h-full w-full object-cover"
    />
  </div>
);

export default function BookAppointment() {
  const [book, setBook] = useState(false);

  const { user, isPending } = useCurrentUser();
  return (
    <LazyMotion features={domMax}>
      <m.section
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative my-8 flex min-h-[60vh] items-center bg-cover bg-center bg-no-repeat grayscale lg:my-16 lg:min-h-[80vh]"
      >
        {/* Overlay */}
        <Image
          src={ExpertsImage}
          alt="Experts Image"
          layout="fill"
          objectFit="cover"
          className="absolute h-full w-full grayscale"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="from-gray absolute top-0 h-20 w-full bg-gradient-to-b"></div>
        {!book ? (
          <div className="container py-8 lg:py-16">
            <div className="relative z-10 text-white lg:text-center">
              <h1 className="comp-heading mb-6">Talk to Experts</h1>
              <Button
                className="rounded-full border border-white bg-transparent px-10 py-8 text-base text-white lg:text-xl"
                onClick={() => {
                  if (user) {
                    setBook(true);
                  } else {
                    toast.error("You must be logged in to book an appointment");
                  }
                }}
              >
                Book An Appointment
              </Button>
            </div>
          </div>
        ) : (
          user && <AppointmentForm user={user} />
        )}

        <CloudImage position="left-0 top-0 lg:-top-12" />
        <CloudImage position="bottom-0 left-0 lg:-bottom-10 rotate-180" />
      </m.section>
    </LazyMotion>
  );
}
const AppointmentForm = ({ user }: { user: TUser }) => {
  const [step, setStep] = useState(1);
  const [searchPackage, setSearchPackage] = useState("");
  const debouncedSearchPackage = useDebounce(searchPackage, 300);
  const [searchGuide, setSearchGuide] = useState("");
  const debouncedSearchGuide = useDebounce(searchGuide, 300);
  const [activeTime, setActiveTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const form = useForm<TBookAppointmentSchemaProvider>({
    resolver: zodResolver(BookAppointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      expectation: "",
      appointment_date: new Date(),
      requested_by: user.id,
    },
  });

  const {
    formState: { errors },
  } = form;
  const {
    data: guides,
    isLoading: isLoadingGuides,
    isError: isErrorGuides,
  } = useQuery<TUser[]>({
    queryKey: ["guides", debouncedSearchGuide],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (debouncedSearchGuide) {
          params.set("filters[username][$containsi][0]", debouncedSearchGuide);
        }
        params.set("filters[userType][$eqi][1]", "merchant");
        params.set("pagination[pageSize]", "10");
        params.set("pagination[page]", "1");
        params.set("populate[0]", "profilePicture");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/users?${params.toString()}`,
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    select: (data) => data.filter((i) => i.id !== user.id),
  });

  const {
    data: packages,
    isLoading: isLoadingPackages,
    isError: isErrorPackages,
  } = useQuery<APIResponseCollection<"api::package.package">>({
    queryKey: ["packages-appointment", debouncedSearchPackage],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        if (debouncedSearchPackage) {
          params.set(
            "filters[package_name][$containsi]",
            debouncedSearchPackage,
          );
        }
        params.set("pagination[pageSize]", "10");
        params.set("pagination[page]", "1");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}api/packages?${params.toString()}`,
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    data: availableTime,
    isLoading,
    isError,
  } = useQuery<APIResponseCollection<"api::calendar.calendar">>({
    queryKey: [
      "calendars",
      form.watch("appointment_date"),
      form.watch("guide"),
    ],
    queryFn: async () => {
      if (!form.getValues("guide")) return [];
      const { start, end } = getDateBounds(
        form.getValues("appointment_date").toString(),
      );
      try {
        const query = qs.stringify({
          filters: {
            guides: {
              id: form.getValues().guide,
            },
            is_available: true,
            $and: [
              {
                start_date: {
                  $lte: end,
                },
              },
              {
                end_date: {
                  $gte: start,
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
    setLoading(true);
    const appointment_date = availableTime?.data.find(
      (i) => i.id === activeTime,
    )?.attributes.start_date;
    if (!appointment_date) {
      setLoading(false);
      toast.error(
        "Appointment date is invalid. Please select both time and date.",
      );
      return;
    }
    const payload = {
      ...form.getValues(),
      appointment_date: new Date(appointment_date),
      requested_by: user.id,
    };
    const res = await makeAppointment(payload);
    if (res.status === 200) {
      setLoading(false);
      toast.success("Successfully made an appointment!");
    } else {
      setLoading(false);
      toast.error(`${res?.error?.message}`);
    }
  }
  const tw =
    "rounded-none border-0 border-b-2 bg-transparent text-base placeholder:text-slate-400 text-white placeholder-white";
  return (
    <div className="container relative py-8 lg:py-16">
      <div className="relative z-10 space-y-6 text-white lg:text-center">
        <h1 className="comp-heading uppercase tracking-wider text-shadow-sm">
          Book an Appointment
        </h1>
        <Text
          as="h3"
          variant="display-sm"
          className="text-2xl uppercase tracking-wide text-shadow-sm md:text-3xl"
          bold
        >
          {step === 1 ? "Select package & date" : "Contact Details"}
        </Text>
        <Form {...form}>
          <form
            className="relative z-20 mx-auto max-w-screen-md space-y-3 font-poppins text-black md:space-y-4 [&>label]:text-shadow-sm"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* First step, for appointment details */}
            <span
              className={cn(
                step === 1 ? "flex" : "hidden",
                "w-full flex-col justify-center gap-x-5 transition-all ease-in-out md:flex-row md:items-center",
              )}
            >
              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "line-clamp-1 flex h-10 w-[200px] justify-between rounded-none border-0 border-b-2 border-input bg-transparent text-base font-normal text-white ring-offset-background placeholder:text-muted-foreground hover:bg-transparent hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                              !field.value && "text-white",
                            )}
                          >
                            {field.value
                              ? truncate(
                                  packages?.data.find(
                                    (category) => category.id === field.value,
                                  )?.attributes?.package_name || "",
                                  15,
                                )
                              : "Select package"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Search package..."
                            onValueChange={(value) => {
                              setSearchPackage(value);
                            }}
                          />
                          <CommandList className="max-h-[150px] overflow-y-scroll">
                            <CommandEmpty>No packages found.</CommandEmpty>
                            <CommandGroup>
                              {isLoadingPackages ? (
                                <div className="h-40 w-auto rounded-lg bg-white">
                                  <Loading />
                                </div>
                              ) : (
                                packages?.data?.map((i) => (
                                  <CommandItem
                                    value={`${i.id.toString()}-${i.attributes.package_name}`}
                                    key={`package-category-${i.id}`}
                                    className=""
                                    onSelect={() => {
                                      form.setValue("package", i.id);
                                    }}
                                  >
                                    {i.attributes.package_name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto",
                                        i.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guide"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "line-clamp-1 flex h-10 w-[200px] justify-between rounded-none border-0 border-b-2 border-input bg-transparent text-base font-normal text-white ring-offset-background placeholder:text-muted-foreground hover:bg-transparent hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                                !field.value && "text-white",
                              )}
                            >
                              {field.value
                                ? truncate(
                                    guides?.find(
                                      (guide) => guide.id === field.value,
                                    )?.username || "",
                                    15,
                                  )
                                : "Select guide"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command shouldFilter={false}>
                            <CommandInput
                              placeholder="Search guide..."
                              onValueChange={(value) => {
                                setSearchGuide(value);
                              }}
                            />
                            <CommandList className="max-h-[150px] overflow-y-scroll">
                              <CommandEmpty>No guides found.</CommandEmpty>
                              <CommandGroup>
                                {isLoadingGuides ? (
                                  <div className="h-40 w-auto rounded-lg bg-white">
                                    <Loading />
                                  </div>
                                ) : (
                                  guides?.map((i) => (
                                    <CommandItem
                                      value={`${i.id.toString()}-${i.username}`}
                                      key={`user-guide-${i.id}`}
                                      className=""
                                      onSelect={() => {
                                        form.setValue("guide", i.id);
                                      }}
                                    >
                                      {i.username}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto",
                                          i.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    {/* <FormMessage className="text-white text-shadow-sm" /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full items-center gap-x-2 rounded-none border-0 border-b-2 bg-transparent pl-3 text-left text-base font-normal text-white hover:bg-transparent hover:text-white",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd, MMM, yyyy ")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
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
            </span>
            {/* Second page, for personal information */}
            <span
              className={cn(step === 2 ? "grid grid-cols-2 gap-4" : "hidden")}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Label required className="text-white">
                      Name
                    </Label>
                    <FormControl>
                      <Input
                        className={tw}
                        placeholder="John Doe"
                        {...field}
                        required
                      />
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
                      <Input
                        className={tw}
                        placeholder="john.doe@email.com"
                        {...field}
                      />
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
                      <Input className={tw} placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectation"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Label required className="text-white">
                      Message
                    </Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Your expectation"
                        className={tw}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </span>
            {/* Time slots information */}

            <div className={cn(step === 1 ? "block" : "hidden")}>
              <Text
                as="h3"
                variant="text-xl"
                className="text-3xlmb-6 mx-auto w-fit capitalize tracking-wider text-white drop-shadow-md"
                bold
              >
                Select time
              </Text>
              {availableTime?.data && availableTime?.data?.length > 0 ? (
                <span className="flex flex-wrap items-center justify-center gap-x-2">
                  {availableTime?.data.map((time) => (
                    <Badge
                      onClick={() => setActiveTime(time.id)}
                      className={cn(
                        time.id === activeTime
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-black",
                        "cursor-pointer rounded-none px-4 text-lg font-bold transition ease-linear hover:bg-primary hover:text-white",
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
                <Text
                  variant="text-sm"
                  className="relative z-10 mx-auto text-center font-bold italic text-white drop-shadow-sm"
                >
                  {form.getValues("guide")
                    ? "No time slots available, select another date"
                    : "Select a guide to view available time slots"}
                </Text>
              )}
            </div>
            {/* Third stage, showing details */}
            <div
              className={cn(
                step === 3 ? "grid" : "hidden",
                "gap-5 text-left text-white md:grid-cols-2 [&>*]:text-shadow-sm",
              )}
            >
              {Object.entries(form.getValues()).map(([key, value]) => (
                <div key={`appointment-${key}`} className="w-fit space-y-2">
                  <Text
                    variant="text-xl"
                    className="w-fit capitalize tracking-wide"
                  >
                    {key.split('_').join(' ')}:
                  </Text>

                  <Text
                    variant="text-md"
                    className="w-fit max-w-[300px] whitespace-pre-wrap break-words tracking-wide"
                  >
                    {value &&
                      // @ts-ignore
                      (() => {
                        switch (key) {
                          case "appointment_date":
                            return format(value, "yyyy-MM-dd (EEEE)");
                          case "package":
                            return value
                              ? packages?.data.find(
                                  (i) => i.id === Number(value),
                                )?.attributes.package_name
                              : "Not selected";

                          case "guide":
                            return guides?.find((i) => i.id === Number(value))
                              ?.username;
                          case "requested_by":
                            return user.username;
                          default:
                            return value.toString();
                        }
                      })()}
                  </Text>
                </div>
              ))}
            </div>

            {/* Submit button */}
            <Button
              isLoading={loading}
              type="submit"
              onClick={() => {
                if (!form.formState.isValid) {
                  const firstError = Object.keys(errors).reduce((field, a) => {
                    return !!errors[
                      field as keyof TBookAppointmentSchemaProvider
                    ]
                      ? field
                      : a;
                  }, "");
                  if (firstError) {
                    toast.error(`${capitalize(firstError)} Field is invalid`, {
                      className: "bg-red-100",
                    });
                  }
                }
              }}
              //disabled={!activeTime}
              className={cn(
                step === 3 ? "flex" : "hidden",
                "mx-auto w-fit gap-x-3 self-end rounded-full border border-white !bg-transparent/10 px-10 py-4 font-poppins font-bold text-white shadow-sm shadow-black/30 drop-shadow-2xl sm:py-6",
              )}
            >
              Send
            </Button>
          </form>
        </Form>
        <span className="container relative left-1/2 top-1/2 mx-auto flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between md:absolute lg:max-w-screen-lg [&>button]:text-black">
          <Button
            disabled={step === 1}
            onClick={() => {
              if (step !== 1) {
                setStep(step - 1);
              }
            }}
            className="w-fit rounded-full bg-white p-2"
          >
            <ChevronLeft className="size-4 md:size-6" />
          </Button>

          <Button
            disabled={step >= 3}
            onClick={() => {
              if (!activeTime) {
                toast.error("Select an appointment date to proceed!");
                return;
              }
              if (step < 3) {
                setStep(step + 1);
              }
            }}
            className="w-fit rounded-full bg-white p-2"
          >
            <ChevronRight className="size-4 md:size-6" />
          </Button>
        </span>
      </div>
    </div>
  );
};
const FormMessage = () => {
  return <RawFormMessage className="text-white" />;
};
