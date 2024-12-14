"use client";

import { ReadMoreCell } from "@/components/table/read-more-cell";
import { SortableHeaderButton } from "@/components/table/sortable-header-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLProps } from "react";
import DeleteButton from "./delete-button";

export const columns: ColumnDef<
  APIResponseData<"api::inquiry.inquiry">,
  "id"
>[] = [
  {
    header: "Name",
    accessorKey: "attributes.name",
    cell({ row }) {
      return (
        <Text variant="text-sm">{row?.original?.attributes?.name || "-"}</Text>
      );
    },
  },

  {
    header: "Phone",
    accessorKey: "attributes.phone",
    cell({ row }) {
      return (
        <Text variant="text-sm">{row?.original?.attributes?.phone || "-"}</Text>
      );
    },
  },

  {
    header: "Email",
    accessorKey: "attributes.email",
    cell({ row }) {
      return (
        <Text variant="text-sm">{row?.original?.attributes?.email || "-"}</Text>
      );
    },
  },

  {
    header: "Subject",
    accessorKey: "attributes.subject",
    cell({ row }) {
      return (
        <Text variant="text-sm">{row?.original?.attributes?.email || "-"}</Text>
      );
    },
  },

  {
    header: "message",
    accessorKey: "attributes.message",
    cell({ row }) {
      return (
        <ReadMoreCell message={row?.original?.attributes?.message || "-"} />
      );
    },
  },

  {
    header: "PACKAGE",
    accessorKey: "attributes.package",
    cell({ row }) {
      const package_name =
        row?.original?.attributes?.package?.data?.attributes?.package_name;
      if (package_name)
        return (
          <div className="flex flex-wrap gap-1">
            <Link
              className="btn-primary group bg-primary"
              href={`/packages/${row.original.id}`}
              target="_blank"
            >
              <Tag size={16} />
              <Text variant="text-xs" className="group-hover:underline">
                {row?.original?.attributes?.package?.data?.attributes
                  ?.package_name || "-"}
              </Text>
            </Link>
          </div>
        );
    },
  },

  {
    header: "ACTIONS",
    accessorKey: "edit",
    cell({ row }) {
      return (
        <span className="flex gap-x-2">
          <DeleteButton id={row.original.id} />
        </span>
      );
    },
  },
];
