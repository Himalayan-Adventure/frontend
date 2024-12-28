import { WorkCard } from "@/components/work/work-card";
import { Text } from "@/components/ui/text";
import { WorkPagination } from "@/components/work/pagination";
import { getWorks } from "@/server/work/get-works";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getWorksOfUser } from "@/server/work/get-works-of-user";
import { getCurrentUserData } from "@/server/auth/get-me";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { APIResponseCollection } from "@/types/types";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LoadMorePagination } from "@/components/services/pagination";
export const metadata: Metadata = {
  title: `Work Dashboard | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: { limit?: number };
}) {
  const { limit } = searchParams;
  const user = await getCurrentUserData();
  if (!user) {
    toast.error("Please sign in ");
    redirect("/home");
  }
  const works = await getWorksOfUser({ id: user.id, ...searchParams });

  console.log(works?.meta.pagination);
  return (
    <section className="space-y-8 font-poppins @container">
      {/*Header*/}
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Work
        </Text>

        <Link href="/dashboard/work/write">
          <div className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <PlusIcon size={16} />
            Add Project
          </div>
        </Link>
        {/* <div className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <PlusIcon size={16} />
          Upcoming projects
        </div> */}
      </span>

      {/* Works */}
      <Suspense>
        <div className="rounded-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Works*/}
            <div className="flex flex-col gap-y-32">
              <div className="flex flex-col gap-y-16">
                {(!works?.data || works.data.length) === 0 ? (
                  <Text variant={"text-md"}>No works found.</Text>
                ) : (
                  works?.data
                    ?.slice(0, limit)
                    ?.map((work, index) => (
                      <WorkCard
                        data={work}
                        index={index}
                        key={`work-${index}`}
                        type="edit"
                      />
                    ))
                )}
              </div>
              {works?.meta && (
                <LoadMorePagination
                  defaultLimit={5}
                  disabled={
                    works.meta.pagination.total <=
                    works?.meta.pagination.pageSize
                  }
                />
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </section>
  );
}
