import { getCurrentUserData } from "@/server/auth/get-me";
import { ServiceAddOrEditForm } from "../../add-or-edit-form";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { getSingleService } from "@/server/services/get-single-service";
export const metadata: Metadata = {
  title: `Edit Service Dashboard`,
  description: ` ${siteConfig.siteName}`,
};
const ServiceAddPage = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const user = await getCurrentUserData();
  const data = await getSingleService(id);
  return (
    <section>
      {user && data?.data && (
        <ServiceAddOrEditForm type={"edit"} id={id} data={data.data} />
      )}
    </section>
  );
};
export default ServiceAddPage;
