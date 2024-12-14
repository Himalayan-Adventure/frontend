import { Text } from "@/components/ui/text";
import { PencilLineIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { getCurrentUserData } from "@/server/auth/get-me";
import { getAppointments } from "@/server/appointments/get-appointments";
import DataTable from "./_table/data-table";
import { columns } from "./_table/columns-def";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Appointments Dashboard | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function ApppointmentsPage({
  searchParams,
}: {
  searchParams: { page?: number; date?: string };
}) {
  const { page, date } = searchParams;
  const user = await getCurrentUserData();
  if (!user) redirect("/home");
  const data = await getAppointments({ user, page, date });
  return (
    <section className="space-y-8 font-poppins @container">
      {/*Header*/}
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Appointments
        </Text>
      </span>
      <div className="relative flex flex-col gap-5 md:flex-row">
        <DataTable
          data={data?.data || []}
          meta={data?.meta}
          columns={columns}
          className="table-scrollbar relative max-h-[calc(100dvh-var(--navbar-height)-150px)] overflow-auto"
        />
      </div>
    </section>
  );
}
