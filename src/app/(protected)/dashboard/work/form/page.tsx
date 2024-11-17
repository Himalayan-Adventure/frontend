import { TWorkForm } from "@/validators/work-validator";
import { WorkAddOrEditForm } from "../add-or-edit-form";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
const WorkAddFormPage = ({
  searchParams,
}: {
  searchParams: { type: "edit" | "add" };
}) => {
  return (
    <section>
      <WorkAddOrEditForm type={searchParams?.type} />
    </section>
  );
};
export default WorkAddFormPage;
