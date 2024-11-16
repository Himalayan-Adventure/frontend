"use client";
import BlogCard from "@/components/blog/blog-card";
import { WorkCard } from "@/components/profile/work-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { setHours, setMinutes } from "date-fns";
import {
  Calendar as CalendarIcon,
  PencilIcon,
  PenLine,
  Plus,
  PlusIcon,
  Shapes,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, Suspense, useState } from "react";
import { DateCard } from "./date-card";
import { AddAvailabilityDialog } from "./add-dialog";

export default function CalendarPage() {
  const [limit, setLimit] = useState(6);

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [timeValue, setTimeValue] = useState<string>("00:00");
  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!startDate) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(startDate, minutes), hours);
    setStartDate(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setStartDate(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setStartDate(newDate);
  };
  return (
    <section className="space-y-8 font-poppins @container">
      {/*Header*/}
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Calendar
        </Text>

        <Button className="gap-x-3 bg-black text-sm text-white">
          <Plus size={16} />
          Add activity
        </Button>
      </span>
      <span className="flex items-start gap-x-4">
        <div className="w-fit space-y-4">
          <span className="flex items-center justify-between rounded-lg border border-black px-3 py-4 text-primary">
            <Text variant={"text-lg"}>
              {startDate?.toLocaleDateString()} -{" "}
              {endDate?.toLocaleDateString()}
            </Text>
            <CalendarIcon size={18} />
          </span>
          <span className="flex w-full flex-col gap-x-4">
            <form style={{ marginBlockEnd: "1em" }} className="space-y-4">
              <Calendar
                mode="single"
                numberOfMonths={2}
                selected={startDate}
                onSelect={setStartDate}
                className="h-auto w-full max-w-none rounded-md border"
              />

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-semibold">Time </label>
                <span className="flex gap-x-2">
                  <input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    className="text-green-800"
                  />
                  <input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    className="text-red-800"
                  />
                </span>
              </div>
            </form>
          </span>
          <span className="grid grid-cols-2 gap-8">
            <Button className="">Available Date</Button>
            <Button className="">Busy Date</Button>
            <AddAvailabilityDialog />
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4">
          <DateCard />
          <DateCard />
        </div>
      </span>
    </section>
  );
}
