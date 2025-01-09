import CommonBanner from "@/components/ui/common-banner";
import { ResetPasswordForm } from "./reset-password-form";

import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Reset Password | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteDescription}`,
};
export default function Page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return (
    <section className="container">
      <CommonBanner title="Reset Password" />
      <ResetPasswordForm code={searchParams.code} />
    </section>
  );
}
