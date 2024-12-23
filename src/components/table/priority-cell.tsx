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

export const PriorityCell = ({ id }: { id: number }) => {
  const PRIORITY_KEY = `appointment-priority-${id}`;
  const [priority, setPriority] = useState<string | null>(
    localStorage.getItem(PRIORITY_KEY) || null,
  );

  useEffect(() => {
    if (priority) {
      localStorage.setItem(PRIORITY_KEY, priority);
    }
  }, [priority]);
  return (
    <Select value={priority || ""} onValueChange={(e) => setPriority(e)}>
      <SelectTrigger className="w-fit text-sm">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
