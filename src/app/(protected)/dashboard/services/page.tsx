import { Text } from "@/components/ui/text";
import Link from "next/link";
import { GrUpgrade } from "react-icons/gr";

import { TbMessageCircleSearch } from "react-icons/tb";
import { PlusIcon } from "lucide-react";
import { getServices } from "@/server/services/get-services";
import DataTable from "./_table/data-table";
import { columns } from "./_table/columns-def";
import { getCurrentUserData } from "@/server/auth/get-me";
import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Services Dashboard | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { name?: string; page?: number };
}) {
  const { name, page } = searchParams;
  const user = await getCurrentUserData();
  const data = await getServices({ name, id: user?.id, page });

  return (
    <section className="space-y-4">
      <span className="flex items-center gap-x-3 font-poppins">
        <Text variant="display-sm" bold>
          Services
        </Text>

        {user?.userType === "merchant" && (
          <Link href="/dashboard/services/write" prefetch={true}>
            <div className="btn-primary font-semibold">
              <PlusIcon size={16} />
              Add Services
            </div>
          </Link>
        )}
        <div className="btn-primary font-semibold">
          <GrUpgrade size={16} />
          Service Request
        </div>
        <div className="btn-primary font-semibold">
          <TbMessageCircleSearch size={16} />
          Service Enquiry
        </div>
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
