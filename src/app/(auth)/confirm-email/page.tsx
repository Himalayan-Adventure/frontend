import CommonBanner from "@/components/ui/common-banner";
import { ConfirmEmailForm } from "./confirm-email-form";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Confirm email | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteDescription}`,
};
export default function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return (
    <section className="container">
      <CommonBanner title="Confirm email" />
      <ConfirmEmailForm/>
    </section>
  );
}
