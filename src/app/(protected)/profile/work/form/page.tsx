import { TWorkForm } from "@/validators/work-validator";
import { WorkAddOrEditForm } from "../add-or-edit-form";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
const WorkAddForm = ({
  props,
}: {
  props: { type: "edit" | "add" };
  data?: TWorkForm;
}) => {
  return (
    <section>
      <Suspense>
        <GoBackButton className="my-5" />
      </Suspense>
      <WorkAddOrEditForm type={props?.type} />
    </section>
  );
};
export default WorkAddForm;
