import CommonBanner from "@/components/ui/common-banner";
import { ResetPasswordForm } from "./reset-password-form";

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
