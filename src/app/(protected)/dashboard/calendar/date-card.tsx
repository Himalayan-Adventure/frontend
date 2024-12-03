"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { APIResponseData } from "@/types/types";
import { Calendar, Clock } from "lucide-react";

export const DateCard = ({
  data,
  active,
}: {
  data: APIResponseData<"api::calendar.calendar">;
  active: boolean;
}) => {
  const updateQueryString = useUpdateQueryString();
  return (
    <Card
      className={cn(
        active && "border-2 border-yellow-500 bg-yellow-50",
        "w-fit cursor-pointer space-y-2 p-4 pr-8",
      )}
      onClick={() => updateQueryString({ active: data?.id.toString() })}
    >
      <CardTitle className="text-base font-normal">
        {data?.attributes?.is_available ? "Available" : "Busy"}
      </CardTitle>
      <CardDescription className="flex flex-col gap-y-4">
        <span className="flex gap-x-2">
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
            <Text variant="text-sm" className="text-green-800">
              {format(new Date(data?.attributes?.start_date), "hh:mm a")}
            </Text>
            <Text variant="text-sm" className="">
              &nbsp;:&nbsp;
            </Text>
            <Text variant="text-sm" className="text-red-800">
              {format(new Date(data?.attributes?.end_date), "hh:mm a")}
            </Text>
          </span>
        </span>
      </CardDescription>
    </Card>
  );
};

import { format, isSameMonth, isSameYear } from "date-fns";
import { cn } from "@/lib/utils";
import useUpdateQueryString from "@/hooks/use-update-query-string";

function formatDateRange(start: Date | string, end: Date | string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isSameMonth(startDate, endDate) && isSameYear(startDate, endDate)) {
    return `${format(startDate, "d")}-${format(endDate, "d MMM yyyy")}`;
  } else if (isSameYear(startDate, endDate)) {
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM yyyy")}`;
  } else {
    return `${format(startDate, "d MMM")} - ${format(endDate, "d MMM")}, ${format(startDate, "yyyy")}/${format(endDate, "yy")}`;
  }
}
