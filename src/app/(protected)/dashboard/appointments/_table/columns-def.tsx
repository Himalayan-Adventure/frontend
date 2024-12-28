"use client";

import { ReadMoreCell } from "@/components/table/read-more-cell";
import { SortableHeaderButton } from "@/components/table/sortable-header-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Mail, Phone, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLProps } from "react";
import DeleteButton from "./delete-button";
import { StatusSelectCell } from "@/components/table/status-select-cell";
import { PriorityCell } from "@/components/table/priority-cell";

export const columns: ColumnDef<
  APIResponseData<"api::appointment.appointment">,
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
  // {
  //  header: "time",
  // accessorKey: "attributes.appointment_date",
  //cell({ row }) {
  // const time = row?.original?.attributes?.appointment_date;
  //return time ? format(new Date(time), "hh:mm a") : "-";
  //},
  //},

  {
    header: "client",
    accessorKey: "attributes.name",
    cell({ row }) {
      const user = row.original;
      return (
        user && (
          <Link
            href={`/profile/${user.id}`}
            className="hover:underline"
            target="_blank"
          >
            <Text variant="text-sm">{row?.original?.attributes?.name}</Text>
          </Link>
        )
      );
    },
  },

  // {
  //   header: "subject",
  //   accessorKey: "attributes.name",
  //   cell({ row }) {
  //     return <Text variant="text-sm">{row?.original?.attributes?.name}</Text>;
  //   },
  // },

  {
    header: "message",
    accessorKey: "attributes.expectation",
    cell({ row }) {
      return (
        <ReadMoreCell message={row?.original?.attributes?.expectation || "-"} />
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <SortableHeaderButton
          sortOnClient
          column={column}
          label="Appointment date"
          className="justify-start"
        />
      );
    },
    accessorKey: "attributes.appointment_date",
    cell({ row }) {
      return (
        <p className="text-sm font-medium">
          {format(
            new Date(row?.original?.attributes?.appointment_date),
            "yyyy-MM-dd hh:mm a",
          )}
        </p>
      );
    },
  },

  {
    header: "priority",
    accessorKey: "attributes.priority",
    cell({ row }) {
      return <PriorityCell id={row.original.id} />;
    },
  },

  {
    header: "package",
    accessorKey: "attributes.package",
    cell({ row }) {
      const selectedPackage = row?.original?.attributes?.package;
      return (
        selectedPackage?.data && (
          <Link href={`/packages/${selectedPackage.data.id}`} target={"_blank"}>
            <span className="btn-primary bg-primary">
              <Tag size={16} />
              <Text variant="text-xs">
                {selectedPackage.data?.attributes?.package_name || "-"}
              </Text>
            </span>
          </Link>
        )
      );
    },
  },

  {
    header: "status",
    accessorKey: "attributes.status",
    cell({ row }) {
      return <StatusSelectCell id={row.original.id} />;
    },
  },

  {
    header: "creator",
    accessorKey: "attributes.phone",
    cell({ row }) {
      const phone = row?.original?.attributes?.phone;
      const email = row?.original?.attributes?.email;
      return (
        <span className="flex gap-x-2">
          {phone && (
            <Link
              href={`tel:+977 ${phone}`}
              className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
            >
              <Phone size={18} />
            </Link>
          )}

          {email && (
            <Link
              href={`mailto:${email}`}
              className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
            >
              <Mail size={18} />
            </Link>
          )}
        </span>
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

export const userColumns: ColumnDef<
  APIResponseData<"api::appointment.appointment">,
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
  // {
  //  header: "time",
  // accessorKey: "attributes.appointment_date",
  //cell({ row }) {
  // const time = row?.original?.attributes?.appointment_date;
  //return time ? format(new Date(time), "hh:mm a") : "-";
  //},
  //},

  {
    header: "guide",
    accessorKey: "attributes.guide",
    cell({ row }) {
      const guide = row?.original?.attributes?.guide?.data;
      return (
        guide && (
          <Link href={`/profile/${guide.id}`}>
            <Text variant="text-sm">{guide.attributes.username}</Text>
          </Link>
        )
      );
    },
  },

  // {
  //   header: "subject",
  //   accessorKey: "attributes.name",
  //   cell({ row }) {
  //     return <Text variant="text-sm">{row?.original?.attributes?.name}</Text>;
  //   },
  // },

  {
    header: "message",
    accessorKey: "attributes.expectation",
    cell({ row }) {
      return (
        <ReadMoreCell message={row?.original?.attributes?.expectation || "-"} />
      );
    },
  },

  {
    header: ({ column }) => {
      return (
        <SortableHeaderButton
          sortOnClient
          column={column}
          label="Appointment date"
          className="justify-start"
        />
      );
    },
    accessorKey: "attributes.appointment_date",
    cell({ row }) {
      return (
        <p className="text-sm font-medium">
          {format(
            new Date(row?.original?.attributes?.appointment_date),
            "yyyy-MM-dd hh:mm a",
          )}
        </p>
      );
    },
  },

  {
    header: "package",
    accessorKey: "attributes.package",
    cell({ row }) {
      const selectedPackage = row?.original?.attributes?.package;
      return (
        selectedPackage?.data && (
          <Link href={`/packages/${selectedPackage.data.id}`} target={"_blank"}>
            <span className="btn-primary bg-primary">
              <Tag size={16} />
              <Text variant="text-xs">
                {selectedPackage.data?.attributes?.package_name || "-"}
              </Text>
            </span>
          </Link>
        )
      );
    },
  },

  {
    header: "Contact",
    accessorKey: "attributes.phone",
    cell({ row }) {
      const guide = row.original.attributes.guide?.data.attributes;
      //const phone = guide?.email.;
      const email = row?.original?.attributes?.email;
      return (
        <span className="flex gap-x-2">
          {/* {phone && (
            <Link
              href={`tel:+977 ${phone}`}
              className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
            >
              <Phone size={18} />
            </Link>
          )} */}

          {email && (
            <Link
              href={`mailto:${email}`}
              className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
            >
              <Mail size={18} />
            </Link>
          )}
        </span>
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
