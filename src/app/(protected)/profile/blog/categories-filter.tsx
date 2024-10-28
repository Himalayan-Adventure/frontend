"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { Shapes } from "lucide-react";
import { useSearchParams } from "next/navigation";
export const CategoriesFilter = () => {
  const searchParams = useSearchParams();
  const updateQueryString = useUpdateQueryString();
  return (
    <Select
      onValueChange={(value) => updateQueryString({ tag: value })}
      defaultValue={searchParams?.get("tag") || ""}
    >
      <SelectTrigger className="relative h-full w-fit border-none bg-transparent outline-none">
        <Button
          variant="ghost"
          className="relative h-full gap-x-2 rounded-full border border-gray-200 bg-white"
        >
          <Shapes size={18} />
          Categories
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tag-1">tag-1</SelectItem>
        <SelectItem value="tag-2">tag-2</SelectItem>
      </SelectContent>
    </Select>
  );
};
