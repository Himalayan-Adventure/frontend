"use client";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function LoadMorePagination({
  title,
  disabled,
  className,
}: {
  title?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [limit, setLimit] = useState(10);
  const updateQueryString = useUpdateQueryString();
  return (
    <span className={cn("flex flex-col items-center gap-y-5", className)}>
      {title && (
        <Text className="text-primary" variant="text-sm">
          {title}
        </Text>
      )}
      <Button
        onClick={() => {
          setLimit(limit + 10);
          updateQueryString({ limit: limit.toString() });
        }}
        disabled={disabled}
        className=""
      >
        Show more
      </Button>
    </span>
  );
}
