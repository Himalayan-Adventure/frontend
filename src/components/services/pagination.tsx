"use client";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useState } from "react";

export function ServicesPagination({ disabled }: { disabled?: boolean }) {
  const [limit, setLimit] = useState(10);
  const updateQueryString = useUpdateQueryString();
  return (
    <span className="flex flex-col items-center gap-y-5">
      <Text className="text-primary" variant="text-sm">
        Continue exploring amazing views
      </Text>
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
