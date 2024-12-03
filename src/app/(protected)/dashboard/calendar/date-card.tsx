import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Calendar, Clock } from "lucide-react";

export const DateCard = () => {
  return (
    <Card className="w-fit space-y-2 p-4 pr-8">
      <CardTitle className="text-base font-normal">Available</CardTitle>
      <CardDescription className="flex flex-col gap-y-4">
        <span className="flex gap-x-2">
          <Calendar size={18} />
          <Text variant="text-sm">19-20 January 2024</Text>
        </span>
        <span className="flex gap-x-2">
          <Clock size={18} />
          <span className="flex items-center">
            <Text variant="text-sm" className="text-green-800">
              9:00PM
            </Text>
            <Text variant="text-sm" className="">
              &nbsp;:&nbsp;
            </Text>
            <Text variant="text-sm" className="text-red-800">
              10:00PM
            </Text>
          </span>
        </span>
      </CardDescription>
    </Card>
  );
};
