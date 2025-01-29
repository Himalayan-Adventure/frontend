import { Text } from "@/components/ui/text";
import { Plus } from "lucide-react";
import { DateCard } from "./date-card";
import CalendarSection from "./calendar-section";
import { getCalendars } from "@/server/calendar/get-calendars";
import Link from "next/link";
import { LoadMorePagination } from "@/components/services/pagination";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { getCurrentUserData } from "@/server/auth/get-me";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Calendar Dashboard`,
  description: ` ${siteConfig.siteDescription}`,
};
export default async function CalendarPage({
  searchParams,
}: {
  searchParams: { available: boolean; active?: number; limit?: number };
}) {
  const { available, active, limit } = searchParams;
  const user = await getCurrentUserData();
  if (!user) {
    redirect("/home");
  }
  const calendars = await getCalendars({ available, limit, id: user.id });
  return (
    <section className="space-y-8 font-poppins @container">
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Calendar
        </Text>

        <Link
          href="/dashboard/calendar/add"
          className="btn-primary gap-x-3 bg-black text-sm text-white"
        >
          <Plus size={16} />
          Add activity
        </Link>
      </span>
      <span className="flex flex-col items-start gap-x-4 gap-y-10 @5xl:flex-row">
        {calendars.data && calendars.data.length > 0 ? (
          <>
            <CalendarSection
              data={
                active
                  ? calendars?.data?.find((i) => i.id === Number(active))
                  : calendars?.data?.[0]
              }
            />
            <div className="flex flex-col items-start gap-y-5">
              <div className="flex flex-wrap gap-4">
                {calendars.data.map((i, index) => (
                  <DateCard
                    key={`calendar-${i.id}`}
                    data={i}
                    active={active ? i.id === Number(active) : index === 0}
                  />
                ))}
              </div>
              {calendars?.meta && (
                <LoadMorePagination
                  defaultLimit={20}
                  disabled={
                    calendars.meta?.pagination.total <=
                    calendars.meta?.pagination.pageSize
                  }
                />
              )}
            </div>
          </>
        ) : (
          <Text variant={"text-md"}>No calendars found</Text>
        )}
      </span>
    </section>
  );
}
