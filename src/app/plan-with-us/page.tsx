import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/planPgBg.png";
import PlanSteps from "@/components/plan-page/plan-steps";
import { PlanProvider } from "@/components/plan-page/plan-context";

export default function PlanWithUsPage() {
  return (
    <main>
      <PlanProvider>
        <CommonBanner title="Plan With Us" bgImage={bgImage} />
        <PlanSteps />
      </PlanProvider>
    </main>
  );
}
