import { CalendarAddOrEditForm } from "../add-or-edit-form";

import { getCurrentUserData } from "@/server/auth/get-me";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Add Calendar`,
  description: ` ${siteConfig.siteName}`,
};
const CalendarFormPage = async () => {
  const user = await getCurrentUserData();
  return (
    <section>
      {user && <CalendarAddOrEditForm user={user} type={"add"} />}
    </section>
  );
};
export default CalendarFormPage;
