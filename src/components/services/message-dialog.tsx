"use client";

import { useGuideDialog } from "@/store/get-guide-dialog-type";
import { TUserDeep } from "@/types/auth";
import { AutoForm } from "@/components/ui/autoform";
import { guideMessageSchemaProvider } from "@/validators/guide-message-form";
import { Text } from "../ui/text";

export const MessageDialog = ({ user }: { user: TUserDeep }) => {
  const { type, setType, setDialogOpen } = useGuideDialog();
  const socialMedia = {
    facebook: user.about?.facebook,
    instagram: user.about?.instagram,
    whatsapp: user.about?.whatsapp,
  };
  return (
    <div className="relative">
      <Text className="w-full text-center" variant={"text-md"}>
        Leave a message
      </Text>
      <AutoForm
        schema={guideMessageSchemaProvider}
        onSubmit={(data) => {
          console.log(data);
        }}
        withSubmit
      />
    </div>
  );
};
