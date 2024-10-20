"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      className={cn(className, "border bg-primary/10")}
      onClick={() => router.back()}
      variant="ghost"
    >
      <ChevronLeft size={16} />
      Go Back
    </Button>
  );
};
