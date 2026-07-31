"use client";

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
  APIResponseData<"api::service.service">,
  "id"
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    header: "IMAGES",
    accessorKey: "image",
    cell({ row }) {
      //prettier-ignore
      //@ts-ignore
      const image = row?.original?.image?.formats?.small || row?.original?.image
      return image?.url ? (
        <Image
          src={image?.url}
          height={image?.height || 200}
          width={image?.width || 200}
          alt={
            image?.alternativeText ||
            image?.name ||
            `Service image ${row?.original?.title}`
          }
          className="aspect-video object-cover object-center max-w-32"
        />
      ) : (
        <Text variant="text-xs" className="italic">
          (Image unavailable)
        </Text>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <SortableHeaderButton
          sortOnClient
          column={column}
          label="SERVICES TITLE"
          className="justify-start"
        />
      );
    },
    accessorKey: "title",
    cell({ row }) {
      return <Text variant="text-sm">{row?.original?.title}</Text>;
    },
  },

  {
    header: ({ column }) => {
      return (
        <SortableHeaderButton
          sortOnClient
          column={column}
          label="SERVICE CHARGE"
          className="justify-start"
        />
      );
    },
    accessorKey: "service_charge",
    cell({ row }) {
      return (
        <Text variant="text-sm">
          {/*@ts-ignore*/}
          Rs. {row.original?.service_charge || "-"}
        </Text>
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <SortableHeaderButton
          sortOnClient
          column={column}
          label="BOOKING CHARGE"
          className="justify-start"
        />
      );
    },
    accessorKey: "booking_charge",
    cell({ row }) {
      return (
        <Text variant="text-sm">
          {/*@ts-ignore*/}
          Rs. {row.original?.booking_charge || "-"}
        </Text>
      );
    },
  },

  {
    header: "SERVICE TYPE",
    accessorKey: "categories",
    cell({ row }) {
      return (
        <Text variant="text-sm">
          {row?.original?.categories?.[0]?.name ||
            "-"}
        </Text>
      );
    },
  },

  {
    header: "ASSOCIATED PACKAGES",
    accessorKey: "associated_packages",
    cell({ row }) {
      const selectedPackage = row?.original?.associated_packages;
      return (
        selectedPackage && (
          <div className="flex flex-wrap gap-1">
            {row.original.associated_packages?.map((i) => (
              <Link href={`/packages/${i.documentId}`} key={`package-tag-${i.id}`}>
                <span className="btn-primary bg-primary">
                  <Tag size={16} />
                  <Text variant="text-xs">{i.package_name}</Text>
                </span>
              </Link>
            ))}
          </div>
        )
      );
    },
  },

  {
    header: "ACTIONS",
    accessorKey: "edit",
    cell({ row }) {
      return (
        <span className="flex gap-x-2">
          <Link
            href={`/dashboard/services/edit/${row.original.documentId}`}
            className="flex h-10 w-fit flex-wrap place-items-center gap-1 rounded-lg border border-blue-500 bg-blue-100 px-2 text-blue-900 hover:bg-blue-900 hover:text-blue-100"
          >
            <PencilLine size={18} />
          </Link>
          <DeleteButton id={row.original.documentId} />
        </span>
      );
    },
  },
];
function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " size-5 cursor-pointer"}
      {...rest}
    />
  );
}
