"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Input, type InputProps } from "@/components/ui/input";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

/**
 * Reusable search bar component that updates the query params according to the selector prop passed with debouncing.
 * @param selector - The key to be used in the query params.
 * @warning This component must be wrapped with Suspense in the parent component.
 */

export default function SearchBar({
  selector,
  className,
  ...props
}: {
  selector: string;
  className?: string;
} & InputProps) {
  const updateQueryString = useUpdateQueryString();
  const searchParams = useSearchParams();
  const debounced = useDebounceCallback(updateQueryString, 250);

  return (
    <div className="relative">
      <Input
        {...props}
        //variant={props.variant || 'no-icon'}
        //icon={props.variant === 'show-icon' && props.icon}
        placeholder={props.placeholder || "Search..."}
        className={cn(
          "h-10 w-full pr-5 text-base placeholder:text-base dark:bg-transparent dark:text-gray-300 sm:h-10",
          className,
        )}
        type="search"
        onChange={(e) => {
          debounced({
            [selector]: e.target.value,
          });
        }}
        defaultValue={searchParams.get(selector) || ""}
      />
      <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}
