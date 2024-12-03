"use client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import Calendar from "react-calendar";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { APIResponseData } from "@/types/types";
import "./_styles/calendar.css";
export default function CalendarSection({
  data,
}: {
  data: APIResponseData<"api::calendar.calendar"> | undefined;
}) {
  const updateQueryString = useUpdateQueryString();
  if (!data?.attributes) {
    return <Text variant="text-lg">No data available</Text>;
  }
  const { start_date, end_date, is_available, notes, heading, guide } =
    data?.attributes || {};

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  return (
    <div className="w-full space-y-4 @4xl:w-fit">
      <span className="flex items-center justify-between rounded-lg border border-black px-3 py-4 text-primary">
        <Text variant={"text-lg"}>
          {format(startDate, "MM/dd/yyyy")} - {format(endDate, "MM/dd/yyyy")}
        </Text>
        <CalendarIcon size={18} />
      </span>
      <span className="flex w-full flex-col gap-x-4">
        <div className="space-4">
          <div className="flex items-center">
            <Calendar
              showDoubleView={true}
              goToRangeStartOnSelect={true}
              //showNavigation={false}
              value={[startDate, endDate]}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="text-lg font-semibold">Time </label>
            <span className="flex items-center gap-x-2">
              <Clock size={18} />
              <span className="flex items-center">
                <Text variant="text-lg" className="text-green-800">
                  {format(new Date(data?.attributes?.start_date), "hh:mm a")}
                </Text>
                <Text variant="text-lg" className="">
                  &nbsp;:&nbsp;
                </Text>
                <Text variant="text-lg" className="text-red-800">
                  {format(new Date(data?.attributes?.end_date), "hh:mm a")}
                </Text>
              </span>
            </span>
          </div>
        </div>
      </span>
      <span className="grid grid-cols-2 gap-8">
        <Button
          className=""
          onClick={() => updateQueryString({ available: "true" }, ["active"])}
        >
          Available Date
        </Button>
        <Button
          onClick={() => updateQueryString({ available: "false" }, ["active"])}
          className=""
        >
          Busy Date
        </Button>
        {/*
        <AddAvailabilityDialog />
          */}
      </span>
    </div>
  );
}
