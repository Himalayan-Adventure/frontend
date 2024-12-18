"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/pagination";
import { Text } from "../ui/text";
import { APIResponseCollectionMetadata } from "@/types/types";
import useUpdateQueryString from "@/hooks/use-update-query-string";

export default function TablePagination({
  meta,
  dataLen,
  className,
}: {
  dataLen: number;
  meta: APIResponseCollectionMetadata;
  className?: string;
}) {
  const [page, setPage] = useState(meta.pagination.page);
  const updateQueryString = useUpdateQueryString();
  return (
    <Pagination className={className}>
      <PaginationContent>
        <Text variant="text-xs">{dataLen} items</Text>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            isActive={page > 1}
            onClick={() => {
              if (page > 1 && meta?.pagination) {
                setPage(page - 1);
                updateQueryString({
                  page: (meta?.pagination.page - 1).toString(),
                });
              }
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
            className="cursor-pointer"
            isActive={
              meta?.pagination ? page < meta?.pagination.pageCount : true
            }
            onClick={() => {
              if (meta?.pagination && page < meta?.pagination.pageCount) {
                setPage(page + 1);
                console.log(page);
                updateQueryString({
                  page: (meta?.pagination.page + 1).toString(),
                });
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
