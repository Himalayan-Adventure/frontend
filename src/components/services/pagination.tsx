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
  paginationText,
  defaultLimit,
}: {
  title?: string;
  disabled?: boolean;
  className?: string;
  paginationText?: string;
  defaultLimit?: number;
}) {
  const [limit, setLimit] = useState(defaultLimit || 10);
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
        {paginationText || "Show more"}
      </Button>
    </span>
  );
}
