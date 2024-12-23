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
import DeleteButton from "../../services/service-requests/_table/delete-button";
import { format, formatDistanceToNow } from "date-fns";

export const columns: ColumnDef<
  APIResponseData<"api::service-request.service-request">,
  "id"
>[] = [
  {
    header: "Service Name",
    accessorKey: "attributes.services.title",
    cell({ row }) {
      const service = row?.original?.attributes?.services?.data?.[0];
      return service ? (
        <Text variant="text-sm">
          {row?.original?.attributes?.services?.data?.[0]?.attributes?.title ||
            "-"}
        </Text>
      ) : (
        "-"
      );
    },
  },

  {
    header: "IMAGES",
    accessorKey: "attributes.image",
    cell({ row }) {
      const image =
        row?.original?.attributes?.services?.data?.[0]?.attributes?.image?.data
          ?.attributes;
      return image?.url ? (
        <Image
          src={image?.url}
          height={image?.height || 200}
          width={image?.width || 200}
          alt={
            image?.alternativeText ||
            image?.name ||
            `Service image ${row?.original?.attributes?.services?.data?.[0]?.attributes?.title}`
          }
          className="aspect-video max-h-32 w-auto object-cover object-center"
        />
      ) : (
        <Text variant="text-xs" className="italic">
          (Image unavailable)
        </Text>
      );
    },
  },

  {
    header: "Service Provider",
    accessorKey: "attributes.services.service_provider",
    cell({ row }) {
      const serviceProvider =
        row?.original?.attributes?.services?.data?.[0].attributes
          .service_provider;
      return serviceProvider ? (
        <Link href={`/profile/${serviceProvider.data.id}`}>
          <Text variant="text-sm">
            {serviceProvider.data.attributes.username}
          </Text>
        </Link>
      ) : (
        "-"
      );
    },
  },

  //   {
  //     header: "Requested By",
  //     accessorKey: "attributes.users_permissions_user.username",
  //     cell({ row }) {
  //       const users = row?.original?.attributes?.users_permissions_users?.data;
  //       return (
  //         <span className="flex flex-col gap-y-1">
  //           {users && users.length
  //             ? users.map((user) => (
  //                 <Link key={`user-${user.id}`} href={`/profile/${user.id}`}>
  //                   <Text variant="text-sm">{user.attributes.username}</Text>
  //                 </Link>
  //               ))
  //             : "No user found"}
  //         </span>
  //       );
  //     },
  //   },

  //   {
  //     header: "Requestee Contact",
  //     accessorKey: "attributes.users_permissions_user.email",
  //     cell({ row }) {
  //       const users = row?.original?.attributes?.users_permissions_users?.data;
  //       return (
  //         <span className="flex flex-col gap-x-2">
  //           {users &&
  //             users.length > 0 &&
  //             users.map((user) => (
  //               <span className="flex gap-x-2" key={`user-contact-${user.id}`}>
  //                 {user?.attributes?.contact?.phone && (
  //                   <Link
  //                     href={`tel:+977 ${user?.attributes?.contact?.phone}`}
  //                     className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
  //                   >
  //                     <Phone size={18} />
  //                   </Link>
  //                 )}

  //                 {user?.attributes?.email && (
  //                   <Link
  //                     href={`mailto:${user?.attributes?.email}`}
  //                     className="grid w-fit place-items-center rounded-full bg-gray-100 p-3 text-blue-600 transition ease-in-out hover:bg-blue-600 hover:text-gray-100"
  //                   >
  //                     <Mail size={18} />
  //                   </Link>
  //                 )}
  //               </span>
  //             ))}
  //         </span>
  //       );
  //     },
  //   },
  {
    header: ({ column }) => {
      return (
        <SortableHeaderButton sortOnClient column={column} label="Created on" />
      );
    },
    accessorKey: "attributes.createdOn",
    cell({ row }) {
      return (
        row?.original?.attributes?.createdAt && (
          <Text variant="text-sm">
            {format(
              new Date(row?.original?.attributes?.createdAt),
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
          <DeleteButton id={row.original.id} />
        </span>
      );
    },
  },
];
