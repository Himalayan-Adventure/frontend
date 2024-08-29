import { Text } from "@/components/ui/text";
import { getSinglePackage } from "@/server/packages/get-single-package";

export default async function PackagePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSinglePackage(Number(params.id));
  return <Text variant="text-xl">Package</Text>;
}
