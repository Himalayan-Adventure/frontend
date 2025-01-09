import { PlanProvider } from "@/components/plan-page/plan-context";
import TestPlan from "@/components/plan-page/TestPlan";
import CommonBanner from "@/components/ui/common-banner";
import { getPlanSteps } from "@/server/steps/get-steps";
import bgImage from "/public/images/planPgBg.png";
import { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
export const metadata: Metadata = {
  title: `Plan with us | ${siteConfig.siteName}`,
  description: ` ${siteConfig.siteName}`,
};
export default async function PlanWithUsPage() {
  const steps = await getPlanSteps();

  return (
    <main>
      <PlanProvider>
        <CommonBanner title="Plan With Us" bgImage={bgImage} />
        <TestPlan />
      </PlanProvider>
    </main>
  );
}
