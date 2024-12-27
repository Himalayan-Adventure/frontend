import { Text } from "@/components/ui/text";
import Link from "next/link";
import { GrUpgrade } from "react-icons/gr";

import { TbMessageCircleSearch } from "react-icons/tb";
import { PlusIcon, Workflow } from "lucide-react";
import { getServices } from "@/server/services/get-services";
import DataTable from "../services/_table/data-table";
import { columns } from "./_table/columns-def";
import { getCurrentUserData } from "@/server/auth/get-me";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { GoBackButton } from "@/components/profile/go-back-button";
import { getInquiries } from "@/server/inquiry/get-inquiries";
import { redirect } from "next/navigation";
import {
  getServiceRequestedByUser,
  getServiceRequests,
} from "@/server/services/get-service-request-for-guide";

export const metadata: Metadata = {
  title: `Services Requested by me | Dashboard | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function ServicesRequestedPage({
  searchParams,
}: {
  searchParams: { name?: string; page?: number; date?: string };
}) {
  const { name, page, date } = searchParams;
  const user = await getCurrentUserData();
  if (!user) {
    redirect("/home");
  }
  const data = await getServiceRequestedByUser({ id: user?.id, page, date });

  return (
    <section className="space-y-4">
      <span className="flex items-center gap-x-3 font-poppins">
        <Text variant="display-sm" bold>
          Services Requested
        </Text>
      </span>

      <span className="flex w-full gap-x-2">
        {user?.userType === "customer" && (
          <Link
            href="/dashboard/services-requested"
            prefetch={true}
            className="w-fit"
          >
            <div className="btn-primary w-fit font-semibold">Request</div>
          </Link>
        )}

        {/* {user?.userType === "customer" && (
          <Link
            href="/dashboard/services/services-requested"
            prefetch={true}
            className="w-fit"
          >
            <div className="btn-primary w-fit font-semibold">Response</div>
          </Link>
        )} */}
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
