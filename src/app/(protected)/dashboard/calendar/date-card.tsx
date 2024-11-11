import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Calendar } from "lucide-react";

export const DateCard = () => {
  return (
    <Card className="w-fit space-y-2 p-4">
      <CardTitle className="text-base lg:text-lg">Lorem</CardTitle>
      <CardDescription>
        <span className="flex gap-x-2">
          <Calendar size={18} />
          <Text variant="text-sm">19 January 2024</Text>
        </span>
      </CardDescription>
    </Card>
  );
};
