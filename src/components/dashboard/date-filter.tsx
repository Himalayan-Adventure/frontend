"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { format, subDays } from "date-fns";
import { useSearchParams } from "next/navigation";

export default function DateFilter() {
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  return (
    <Select
      onValueChange={(value) => {
        console.log(value);
        switch (value) {
          case "all":
            updateQueryString({}, ["date"]);
            return;

          case "today": {
            updateQueryString({ date: format(new Date(), "yyyy-MM-dd") });
            return;
          }
          case "pastWeek": {
            updateQueryString({
              date: format(subDays(new Date(), 7), "yyyy-MM-dd"),
            });
            return;
          }

          case "pastMonth": {
            updateQueryString({
              date: format(subDays(new Date(), 30), "yyyy-MM-dd"),
            });
            return;
          }

          case "pastYear": {
            updateQueryString({
              date: format(subDays(new Date(), 365), "yyyy-MM-dd"),
            });
            return;
          }
        }
      }}
    >
      <SelectTrigger className="w-fit max-w-none [&>*]:whitespace-nowrap [&>span]:line-clamp-none">
        <SelectValue placeholder="Select date" className="" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="pastWeek">Past week</SelectItem>
        <SelectItem value="pastMonth">Past Month</SelectItem>
        <SelectItem value="pastYear">Past Year</SelectItem>
      </SelectContent>
    </Select>
  );
}
