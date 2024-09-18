import React from "react";

interface ContactInfo {
  label: string;
  value: string;
}
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Text } from "@/components/ui/text";
interface ContactData {
  info: ContactInfo[];
  personalInfo: ContactInfo[];
}

const contactData: ContactData = {
  info: [
    { label: "Phone", value: "98765432222" },
    { label: "Email", value: "abc@gmail.com" },
    { label: "Birthday", value: "24th July,1998" },
    { label: "Address", value: "Kathmandu, Nepal" },
    { label: "Gender", value: "Female" },
    { label: "Reports to", value: "Lorem Ipsum" },
  ],
  personalInfo: [
    { label: "Citizenship No.", value: "12xxxxxxxxxxxx" },
    { label: "Phone", value: "986237232" },
    { label: "Nationality", value: "Nepali" },
    { label: "Religion", value: "Hindu" },
    { label: "Marital status", value: "Single" },
  ],
};

export const ContactCard = () => {
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
    <Text variant="text-xl" className="" semibold>{title}</Text>
    {data.map((item, index) => (
      <InfoItem key={index} label={item.label} value={item.value} />
    ))}
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3">
    <span className="font-medium">{label}</span>
    <span className="font-medium">:</span>
    <span>{value}</span>
  </div>
);
