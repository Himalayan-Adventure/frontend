"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { cn } from "@/lib/utils";
import { type Column } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";
import { FaSort as Sort } from "react-icons/fa";
// TODO: Make this more reusable
export function SortableHeaderButton<T>({
  column,
  label,
  sortOnClient = false,
  className,
  hideButton,
  breakedWord,
  ...props
}: {
  column: Column<T, unknown>;
  label: string | React.ReactNode;
  sortOnClient?: boolean;
  className?: string;
  hideButton?: boolean;
  breakedWord?: string;
}) {
  const searchParams = useSearchParams();
  const updateQueryString = useUpdateQueryString();

  const sortField = searchParams.get("sortBy") || "";
  const sortDirection = searchParams.get("order") || "";
  const isSorted = column.id === sortField;
  const isAscending = sortDirection === "asc";

  const handleSortOnClient = () => {
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  const handleSortOnServer = () => {
    // if the column is already sorted, reverse the order else push both sortBy and order
    if (column.id === sortField) {
      updateQueryString({
        order: isAscending ? "desc" : "asc",
      });
    } else {
      updateQueryString({
        sortBy: column.id,
        order: "asc",
      });
    }
  };

  return (
    <Button
      variant="no-hover-ghost"
      className={cn(
        "group relative h-full w-full justify-start self-start rounded-none px-0 py-0 text-left",
        className,
      )}
      onClick={sortOnClient ? handleSortOnClient : handleSortOnServer}
      {...props}
    >
      {breakedWord ? (
        <p className="flex flex-col items-end gap-0.5 text-xs sm:text-sm md:text-base">
          {label}

          <span className="pr-[1px] text-[0.785rem] font-medium opacity-80">
            {breakedWord}
          </span>
        </p>
      ) : (
        <>{label}</>
      )}
      <div
        className="ml-1 mr-4 flex items-center gap-1"
        style={{ visibility: hideButton ? "hidden" : "visible" }}
      >
        <Sort
          strokeWidth={2.5}
          className={cn(
            "h-[0.92rem]",
            column.getIsSorted() === "asc" && "text-primary",
            column.getIsSorted() === "desc" && "text-purple-500",
          )}
        />
      </div>
    </Button>
  );
}
