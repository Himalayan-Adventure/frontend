import { getCurrentUserData } from "@/server/auth/get-me";
import { ServiceAddOrEditForm } from "../add-or-edit-form";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Add Service | Dashboard`,
  description: ` ${siteConfig.siteName}`,
};
const ServiceAddPage = async () => {
  const user = await getCurrentUserData();
  return (
    <section>
      {user && <ServiceAddOrEditForm type={"add"} user={user} />}
    </section>
  );
};
export default ServiceAddPage;
