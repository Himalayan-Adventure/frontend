"use client";

import { SortableHeaderButton } from "@/components/table/sortable-header-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Tag } from "lucide-react";
import Image from "next/image";
import React, { HTMLProps } from "react";

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
    accessorKey: "attributes.image",
    cell({ row }) {
      const image = row?.original?.attributes?.image?.data?.attributes;
      return image?.url ? (
        <Image
          src={image?.url}
          height={image?.height || 200}
          width={image?.width || 200}
          alt={
            image?.alternativeText ||
            image?.name ||
            `Service image ${row?.original?.attributes?.title}`
          }
          className="aspect-video object-cover object-center"
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
    accessorKey: "attributes.title",
    cell({ row }) {
      return <Text variant="text-sm">{row?.original?.attributes?.title}</Text>;
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
    accessorKey: "attributes.service_charge",
    cell({ row }) {
      return (
        <Text variant="text-sm">
          {/*@ts-ignore*/}
          Rs. {row.original?.attributes?.service_charge || "-"}
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
    accessorKey: "attributes.booking_charge",
    cell({ row }) {
      return (
        <Text variant="text-sm">
          {/*@ts-ignore*/}
          Rs. {row.original?.attributes?.booking_charge || "-"}
        </Text>
      );
    },
  },

  {
    header: "SERVICE TYPE",
    accessorKey: "attributes.categories",
    cell({ row }) {
      return (
        <Text variant="text-sm">
          {row?.original?.attributes?.categories?.data?.[0]?.attributes?.name ||
            "-"}
        </Text>
      );
    },
  },

  {
    header: "ASSOCIATED PACKAGES",
    accessorKey: "attributes.associated_packages",
    cell({ row }) {
      return (
        <div className="flex flex-wrap gap-1">
          {row.original.attributes.associated_packages?.data.map((i) => (
            <span
              key={`package-tag-${i.id}`}
              className="btn-primary bg-primary"
            >
              <Tag size={16} />
              <Text variant="text-xs">{i.attributes.package_name}</Text>
            </span>
          ))}
        </div>
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
