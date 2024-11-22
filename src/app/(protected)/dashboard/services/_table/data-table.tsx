"use client";

import React, { useMemo, useRef, type CSSProperties } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showBorder?: boolean;
  gap?: "sm" | "md" | "lg";
  alignText?: "left" | "center" | "right";

  className?: string;
  isLoading?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  showBorder = false,
  gap = "sm",
  alignText = "left",
  className,
  isLoading,
}: DataTableProps<TData, TValue>) {
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
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    //debugTable: true,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      columnPinning: {
        left: ["stock_symbol"],
        // right: ['actions-column'],
      },
    },
  });
  console.log(table.getHeaderGroups().map((i) => i.headers.map((j) => j.id)));

  return (
    <div
      className={cn(
        "w-full",
        showBorder && "rounded-md border-[1.5px] border-gray-200",
        className,
      )}
    >
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-background">
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    className={cn(
                      index > 0 && alignTextClassName,
                      paddingX,
                      "text-base font-semibold text-gray-900",
                      "group-hover:!bg-green-100",
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
            ))
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
  );
}

export default DataTable;
