import { TWorkForm } from "@/validators/work-validator";
import { BlogAddOrEditForm } from "../add-or-edit-form";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
const BlogFormPage = ({
  searchParams,
}: {
  searchParams: { type: "edit" | "add" };
}) => {
  return (
    <section>
      <Suspense>
        <GoBackButton className="my-5" />
      </Suspense>
      <BlogAddOrEditForm type={searchParams?.type} />
    </section>
  );
};
export default BlogFormPage;
