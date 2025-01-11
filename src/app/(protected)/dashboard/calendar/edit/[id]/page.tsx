import { CalendarAddOrEditForm } from "../../add-or-edit-form";
import { siteConfig } from "@/config/site-config";
import { getCurrentUserData } from "@/server/auth/get-me";
import { getSingleCalendar } from "@/server/calendar/get-single-calendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Edit Calendar Dashboard`,
  description: ` ${siteConfig.siteName}`,
};
const CalendarEditFormPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const user = await getCurrentUserData();
  const data = await getSingleCalendar(id);
  return (
    <section>
      {user && data?.data && (
        <CalendarAddOrEditForm type={"edit"} data={data.data} id={id} />
      )}
    </section>
  );
};
export default CalendarEditFormPage;
