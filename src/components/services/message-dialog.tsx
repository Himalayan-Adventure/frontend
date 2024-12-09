"use client";

import { useGuideDialog } from "@/store/get-guide-dialog-type";
import { TUserDeep } from "@/types/auth";
import { AutoForm } from "@/components/ui/autoform";
import { InquirySchemaProvider } from "@/validators/inquiry-form";
import { Text } from "../ui/text";

export const MessageDialog = ({ guide }: { guide: TUserDeep }) => {
  const { type, setType, setDialogOpen } = useGuideDialog();
  return (
    <div className="relative">
      <Text className="w-full text-center" variant={"text-md"}>
        Leave a message
      </Text>
      <AutoForm
        schema={InquirySchemaProvider}
        onSubmit={(data) => {
          const payload = { ...data, guide: guide.id };
          console.log(data);
        }}
        withSubmit
      />
    </div>
  );
};
