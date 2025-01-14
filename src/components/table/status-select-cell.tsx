"use client";

import { useState, useEffect } from "react";
import { Text } from "../ui/text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StatusSelectCell = ({ id }: { id: number }) => {
  const STATUS_KEY = `appointment-status-${id}`;
  const [status, setStatus] = useState<string | null>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setStatus(localStorage.getItem(STATUS_KEY) || null);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (status) {
        localStorage.setItem(STATUS_KEY, status);
      }
    }
  }, [status]);
  return (
    <Select value={status || ""} onValueChange={(e) => setStatus(e)}>
      <SelectTrigger className="w-fit text-sm">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
