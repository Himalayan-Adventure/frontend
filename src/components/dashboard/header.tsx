"use client";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
export const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <span className="flex gap-x-3">
      <Text variant="display-sm" bold>
        {title}
      </Text>

      <Link href="/dashboard/work/form?type=add">
        <Button className="bg-black text-sm text-white">
          <PlusIcon size={16} />
          Add Project
        </Button>
      </Link>
      <Button className="bg-black text-sm text-white">
        <PlusIcon size={16} />
        Upcoming Projects
      </Button>
    </span>
  );
};
