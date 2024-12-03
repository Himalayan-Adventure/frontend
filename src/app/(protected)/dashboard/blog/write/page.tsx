import { TWorkForm } from "@/validators/work-validator";
import { BlogAddOrEditForm } from "../add-or-edit-form";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Write Blog Dashboard | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
const BlogFormPage = () => {
  return (
    <section>
      <BlogAddOrEditForm type={"add"} />
    </section>
  );
};
export default BlogFormPage;
