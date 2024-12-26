import React from "react";

interface ContactInfo {
  label: string;
  value?: string;
}
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Text } from "@/components/ui/text";
import { TUser, TUserDeep } from "@/types/auth";
import { capitalize } from "@/lib/utils";
interface ContactData {
  info: ContactInfo[];
  personalInfo: ContactInfo[];
}

export const ContactCard = ({ user }: { user: TUserDeep }) => {
  const data = user?.contact;
  const contactData: ContactData = {
    info: [
      { label: "Phone", value: data?.phone },
      { label: "Email", value: user?.email },
      { label: "Birthday", value: data?.birthday },
      { label: "Address", value: data?.address },
      { label: "Gender", value: capitalize(data?.gender||'') },
      { label: "Reports to", value: data?.reports_to },
    ],
    personalInfo: [
      { label: "Citizenship No.", value: data?.citizenship },
      { label: "Phone", value: data?.phone },
      { label: "Nationality", value: capitalize(data?.nationality || "") },
      { label: "Religion", value: capitalize(data?.religion || "") },
      {
        label: "Marital status",
        value: capitalize(data?.marital_status || ""),
      },
    ],
  };
  return (
    <div className="w-full rounded-xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Contact</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>

        <InfoSection title="Info" data={contactData.info} />
        <InfoSection
          title="Personal Informations"
          data={contactData.personalInfo}
        />
      </div>
    </div>
  );
};

const InfoSection = ({
  title,
  data,
}: {
  title: string;
  data: ContactInfo[];
}) => (
  <div className="space-y-2">
    <Text variant="text-xl" className="" semibold>
      {title}
    </Text>
    {data.map((item, index) => (
      <InfoItem key={index} label={item.label} value={item.value} />
    ))}
  </div>
);

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <div className="grid grid-cols-3">
    <span className="font-semibold">{label}</span>
    <span className="font-medium">:</span>
    <span className="font-semibold">{value || "-"}</span>
  </div>
);
