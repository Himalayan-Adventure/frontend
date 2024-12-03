import { TWorkForm } from "@/validators/work-validator";
import { BlogAddOrEditForm } from "../add-or-edit-form";
import { Suspense } from "react";
import { GoBackButton } from "@/components/profile/go-back-button";
const BlogFormPage = () => {
  return (
    <section>
      <BlogAddOrEditForm type={"add"} />
    </section>
  );
};
export default BlogFormPage;
