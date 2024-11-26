"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { getBlogCategories } from "@/server/blogs/get-blog-categories";
import { useQuery } from "@tanstack/react-query";
import { Shapes } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type } from "os";
export const CategoriesFilter = () => {
  const searchParams = useSearchParams();
  const updateQueryString = useUpdateQueryString();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => await getBlogCategories(),
  });
  if (!data || isError) {
    return <></>;
  }
  if (isFetching) {
    return <Skeleton className="h-10 w-16" />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <Select
        onValueChange={(value) => updateQueryString({ tag: value })}
        defaultValue={searchParams?.get("tag") || ""}
      >
        <SelectTrigger className="relative h-full w-fit gap-x-2 rounded-full border border-none border-gray-200 bg-white outline-none">
          <Shapes size={18} />
          Categories
        </SelectTrigger>
        <SelectContent>
          {data.data.map((i) => (
            <SelectItem key={`categories-${i.id}`} value={i.id.toString()}>
              {i.attributes.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Search blogs"
        value={searchParams?.get("code") || ""}
        className="w-full max-w-80 rounded-full pl-4"
        onChange={(value) => updateQueryString({ code: value.target.value })}
      />
    </div>
  );
};
