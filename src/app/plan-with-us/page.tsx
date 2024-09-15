import CommonBanner from "@/components/ui/common-banner";
import bgImage from "/public/images/planPgBg.png";
import PlanSteps from "@/components/plan-page/plan-steps";

export default function PlanWithUsPage() {
  return (
    <main>
      <CommonBanner title="Plan With Us" bgImage={bgImage} />
      <PlanSteps />
    </main>
  );
}
