"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import SearchBar from "@/components/ui/search-bar";
import useUpdateQueryString from "@/hooks/use-update-query-string";
import { setPriority } from "os";
import { APIResponseCollectionMetadata } from "@/types/types";

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
  const [page, setPage] = useState(1);
  const limit = 10;
  const updateQueryString = useUpdateQueryString();

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
    // onRowSelectionChange: (updaterOrValue) => {
    //   console.log(typeof updaterOrValue);
    //   setRowSelection;
    // },
    getPaginationRowModel: getPaginationRowModel(),
    //debugTable: true,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      columnPinning: {
        left: ["stock_symbol"],
        // right: ['actions-column'],
      },
    },
  });
  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  return (
    <div className="w-full space-y-4">
      <span className="flex items-center justify-between">
        <span className="flex items-center gap-x-4">
          <Select>
            <SelectTrigger className="max-w-36 whitespace-nowrap">
              Bulk action
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="flex flex-row items-center hover:!bg-red-100"
                value="delete"
              >
                <span className="flex items-center gap-x-1">
                  <Trash className="text-red-500" size={16} />
                  Delete
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Apply</Button>
          <Select>
            <SelectTrigger className="max-w-36">All dates</SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
        </span>
        <SearchBar selector="name" />
      </span>

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

      <Pagination>
        <PaginationContent>
          <Text variant="text-xs">{data?.length} items</Text>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => {
                if (page > 1) {
                  updateQueryString({ page: page.toString() });
                }
                setPage(page - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            {meta?.pagination.page}/{meta?.pagination.pageCount}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (meta?.pagination && page <= meta?.pagination.pageCount) {
                  updateQueryString({ page: page.toString() });
                }
                setPage(page - 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DataTable;
