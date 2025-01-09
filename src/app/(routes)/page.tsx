import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default function Page() {
  redirect("/home");
}
