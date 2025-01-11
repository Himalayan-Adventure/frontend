"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { APIResponseData } from "@/types/types";
import { Calendar, Clock, PencilLine, Trash } from "lucide-react";

export const DateCard = ({
  data,
  active,
}: {
  data: APIResponseData<"api::calendar.calendar">;
  active: boolean;
}) => {
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();

  const { mutate: deleteAction, isPending } = useMutation({
    mutationKey: ["calendars", `calendars-${data.id}`],
    mutationFn: async () => await deleteCalendar(data.id),
    onSuccess() {
      if (searchParams.get("active") === data.id.toString()) {
        updateQueryString({}, ["active"]);
      }
      toast.success("Calendar successfully deleted");
    },
  });
  return (
    <Card
      className={cn(
        active && "border-2 border-yellow-500 bg-yellow-50",
        "group relative w-fit flex-1 cursor-pointer space-y-2 p-4 pr-8",
      )}
      onClick={() => updateQueryString({ active: data?.id.toString() })}
    >
      <span className="absolute right-2 top-2 hidden items-center gap-x-2 group-hover:flex">
        <Link
          href={`/dashboard/calendar/edit/${data.id}`}
          className="rounded-full p-1 text-blue-900 hover:bg-blue-900 hover:text-white"
        >
          <PencilLine size={16} />
        </Link>
        <Button
          className="h-auto rounded-full bg-transparent p-1 text-red-600 hover:bg-red-600 hover:text-white"
          isLoading={isPending}
          onClick={() => deleteAction()}
        >
          <Trash size={16} />
        </Button>
      </span>
      <CardTitle className="text-base font-normal">
        {data?.attributes?.is_available ? "Available" : "Busy"}
      </CardTitle>
      <div className="flex flex-col gap-y-4">
        <span className="flex flex-row gap-x-2">
          <Calendar size={18} />
          <Text variant="text-sm">
            {formatDateRange(
              data.attributes.start_date,
              data.attributes.end_date,
            )}
          </Text>
        </span>
        <span className="flex gap-x-2">
          <Clock size={18} />
          <span className="flex items-center">
            <Text
              variant="text-sm"
              className="whitespace-nowrap text-green-800"
            >
              {format(new Date(data?.attributes?.start_date), "hh:mm a")}
            </Text>
            <Text variant="text-sm" className="">
              &nbsp;:&nbsp;
            </Text>
            <Text variant="text-sm" className="whitespace-nowrap text-red-800">
              {format(new Date(data?.attributes?.end_date), "hh:mm a")}
            </Text>
          </span>
        </span>
        <span>
          {data.attributes.heading && (
            <Text variant="text-sm">{data.attributes.heading}</Text>
          )}
        </span>
      </div>
    </Card>
  );
};

import { format, isSameDay, isSameMonth, isSameYear } from "date-fns";
import { cn } from "@/lib/utils";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteCalendar } from "@/server/calendar/delete-calendar";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Popover } from "@/components/ui/popover";

function formatDateRange(start: Date | string, end: Date | string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isSameDay(startDate, endDate)) {
    return `${format(endDate, "d MMM yyyy")}`;
  } else if (
    isSameMonth(startDate, endDate) &&
    isSameYear(startDate, endDate)
  ) {
    return `${format(startDate, "d")}-${format(endDate, "d MMM yyyy")}`;
  } else if (isSameYear(startDate, endDate)) {
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM yyyy")}`;
  } else {
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM")}, ${format(startDate, "yyyy")}/${format(endDate, "yy")}`;
  }
}
