import { WorkAddOrEditForm } from "../add-or-edit-form";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Add Work Dashboard | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
const WorkWritePage = () => {
  return (
    <section>
      <WorkAddOrEditForm type={"add"} />
    </section>
  );
};
export default WorkWritePage;
