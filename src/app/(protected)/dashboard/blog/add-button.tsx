"use client";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const AddButton = () => {
  return (
    <Link href="/dashboard/blog/form?type=add">
      <Button className="bg-black text-sm text-white">
        <PlusIcon size={16} />
        Create
      </Button>
    </Link>
  );
};
