import { GoBackButton } from "@/components/profile/go-back-button";
import { WorkAddOrEditForm } from "../../add-or-edit-form";
import { Text } from "@/components/ui/text";
import { getSingleWork } from "@/server/work/get-single-work";

import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Edit Work Dashboard`,
  description: ` ${siteConfig.siteName}`,
};
type Props = {
  params: {
    id: number;
  };
};
export default async function WorkEditPage({ params }: Props) {
  const { id } = params;
  const work = await getSingleWork(id.toString());
  if (!work?.data?.data) {
    return (
      <section className="space-y-10">
        <GoBackButton />
        <Text variant="text-xl">No available work</Text>
      </section>
    );
  }
  return (
    <section>
      {work?.data && (
        <WorkAddOrEditForm type={"edit"} data={work.data} id={id} />
      )}
    </section>
  );
}
