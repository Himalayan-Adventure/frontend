import CommonBanner from "@/components/ui/common-banner";
import { ConfirmEmailForm } from "./confirm-email-form";

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
