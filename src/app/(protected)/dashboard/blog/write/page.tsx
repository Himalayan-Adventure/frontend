import { TWorkForm } from "@/validators/work-validator";
import { BlogAddOrEditForm } from "../add-or-edit-form";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
import { getCurrentUserData } from "@/server/auth/get-me";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: `Write Blog Dashboard`,
  description: ` ${siteConfig.siteName}`,
};
const BlogFormPage = async () => {
  const user = await getCurrentUserData();
  if (!user) {
    redirect("/home");
  }
  return (
    <section>
      <BlogAddOrEditForm type={"add"} authorID={user?.id} />
    </section>
  );
};
export default BlogFormPage;
