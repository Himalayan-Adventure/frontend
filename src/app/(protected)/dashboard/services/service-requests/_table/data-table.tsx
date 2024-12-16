"use client";

import React, { useMemo, useState, type CSSProperties } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "@/components/ui/search-bar";
import { APIResponseCollectionMetadata } from "@/types/types";
import TablePagination from "@/components/table/table-pagination";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import DateFilter from "@/components/dashboard/date-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showBorder?: boolean;
  gap?: "sm" | "md" | "lg";
  alignText?: "left" | "center" | "right";
  className?: string;
  isLoading?: boolean;
  meta?: APIResponseCollectionMetadata;
}

function DataTable<TData, TValue>({
  columns,
  data,
  showBorder = false,
  gap = "sm",
  meta,
  alignText = "left",
  className,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [date, setDate] = useState(null);
  const paddingX = gap === "sm" ? "px-4" : gap === "md" ? "px-6" : "px-8";
  const alignTextClassName =
    alignText === "left"
      ? "!text-left [&>*]:text-left"
      : alignText === "center"
        ? "!text-center [&>*]:text-center"
        : "!text-right [&>*]:text-right";
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const getCommonPinningStyles = (column: Column<TData>): CSSProperties => {
    const isPinned = column.getIsPinned();
    return {
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
      backgroundColor: "#ffffff",
    };
  };

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns,
    //@ts-ignore
    getRowId: (originalRow) => originalRow.id,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      columnPinning: {
        left: ["name"],
      },
    },
  });
  const updateQueryString = useUpdateQueryString();
  const d = subDays(new Date(), 365);
  console.log(format(d, "yyyy-MM-dd"));

  return (
    <div className="w-full space-y-4">
      {/*
        Top actions bar
      */}
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-x-4">
          <DateFilter />
        </span>
        <SearchBar selector="name" />
      </span>

      {/*
        Table
      */}
      <div
        className={cn(
          "w-full",
          showBorder && "rounded-md border-[1.5px] border-gray-200",
          className,
        )}
      >
        <Table className="relative">
          <TableHeader className="sticky top-0 z-20 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        header.id === "select" && "!w-[20px]",
                        "border-b border-gray-200 !bg-gray-100 font-semibold text-gray-600 [&>*]:font-semibold",
                        paddingX,
                        alignTextClassName.includes("text-right") &&
                          "[&>button]:justify-end",
                      )}
                      key={header.id}
                      style={{ ...getCommonPinningStyles(header.column) }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        className={cn(
                          index > 0 && alignTextClassName,
                          paddingX,
                          "text-base font-semibold text-gray-900",
                          "group-hover:!bg-blue-50",
                          cell.column.id === "select" && "!w-fit",
                        )}
                        key={cell.id}
                        style={{ ...getCommonPinningStyles(cell.column) }}
                      >
                        {flexRender(
                          cell?.column?.columnDef?.cell,
                          cell?.getContext(),
                        ) || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-start">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {isLoading && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bottom-0 top-0 flex h-full w-full items-center gap-2.5 bg-white/50"
            />
          )}
        </Table>
      </div>

      {meta && <TablePagination meta={meta} dataLen={data.length} />}
    </div>
  );
}

export default DataTable;