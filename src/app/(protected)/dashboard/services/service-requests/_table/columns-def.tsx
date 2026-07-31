"use client";

import { ReadMoreCell } from "@/components/table/read-more-cell";
import { SortableHeaderButton } from "@/components/table/sortable-header-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { APIResponseData } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Mail, PencilLine, Phone, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLProps } from "react";
import DeleteButton from "./delete-button";
import { format, formatDistanceToNow } from "date-fns";

export const columns: ColumnDef<
  APIResponseData<"api::service-request.service-request">,
  "id"
>[] = [
  {
    header: "Service Name",
    accessorKey: "services.title",
    cell({ row }) {
      const service = row?.original?.services?.[0];
      return service ? (
        <Text variant="text-sm">
          {row?.original?.services?.[0]?.title ||
            "-"}
        </Text>
      ) : (
        "-"
      );
    },
  },

  {
    header: "Requested By",
    accessorKey: "users_permissions_users.username",
    cell({ row }) {
      const users = row?.original?.users_permissions_users;
      return (
        <span className="flex flex-col gap-y-1">
          {users && users.length
            ? users.map((user) => (
                <Link
                  key={`user-${user.id}`}
                  href={`/profile/${user.username}`}
                  className="hover:underline"
                >
                  <Text variant="text-sm">{user.username}</Text>
                </Link>
              ))
            : "No user found"}
        </span>
      );
    },
  },

  {
    header: "Requestee Contact",
    accessorKey: "users_permissions_users.email",
    cell({ row }) {
      const users = row?.original?.users_permissions_users;
      return (
        <span className="flex flex-col gap-x-2">
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <span className="flex gap-x-2" key={`user-contact-${user.id}`}>
                {user?.contact?.phone && (
                  <Link
                    href={`tel:+977 ${user?.contact?.phone}`}
                    className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
                  >
                    <Phone size={18} />
                  </Link>
                )}

                {user?.email && (
                  <Link
                    href={`mailto:${user?.email}`}
                    className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
                  >
                    <Mail size={18} />
                  </Link>
                )}
              </span>
            ))}
        </span>
      );
    },
  },
  {
    header: "Created on",
    accessorKey: "createdOn",
    cell({ row }) {
      return (
        row?.original?.createdAt && (
          <Text variant="text-sm">
            {format(
              new Date(row?.original?.createdAt),
              "yyyy-MM-dd",
            )}
          </Text>
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
          <DeleteButton id={row.original.documentId} />
        </span>
      );
    },
  },
];
