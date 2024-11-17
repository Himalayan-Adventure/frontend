import { TWorkForm } from "@/validators/work-validator";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
import { WorkAddOrEditForm } from "../add-or-edit-form";
const WorkWritePage = () => {
  return (
    <section>
      <WorkAddOrEditForm type={"add"} />
    </section>
  );
};
export default WorkWritePage;
