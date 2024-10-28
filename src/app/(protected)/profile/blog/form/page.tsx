import { TWorkForm } from "@/validators/work-validator";
import { BlogAddOrEditForm } from "../add-or-edit-form";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
const BlogForm = ({
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
      <BlogAddOrEditForm type={props?.type} />
    </section>
  );
};
export default BlogForm;
