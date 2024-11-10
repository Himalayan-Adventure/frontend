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
  PlusIcon,
  Shapes,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, Suspense, useState } from "react";
import { DateCard } from "./date-card";

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
          <PencilIcon size={16} />
          Update
        </Button>
      </span>
      <div className="w-fit space-y-4">
        <span className="flex items-center justify-between rounded-lg border border-black px-3 py-4 text-primary">
          <Text variant={"text-lg"}>
            {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
          </Text>
          <CalendarIcon size={18} />
        </span>
        <span className="flex w-full flex-col gap-x-4">
          <form style={{ marginBlockEnd: "1em" }}>
            <label>
              Start time:{" "}
              <input
                type="time"
                value={timeValue}
                onChange={handleTimeChange}
              />
            </label>
          </form>
          <Calendar
            mode="single"
            numberOfMonths={2}
            selected={startDate}
            onSelect={setStartDate}
            className="h-auto w-full max-w-none rounded-md border"
          />
        </span>
      </div>
      <DateCard />
    </section>
  );
}
