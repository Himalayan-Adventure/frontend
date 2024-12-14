"use client";
import { Oval } from "react-loader-spinner";
import { Text } from "./ui/text";
import { cn } from "@/lib/utils";

export const Loading = ({
  className,
  size = 32,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-20 w-full flex-col items-center justify-center",
        className,
      )}
    >
      <Text variant="text-md">Loading...</Text>
      <Oval
        height={size}
        width={size}
        color="#FD9100"
        ariaLabel="oval-loading"
      />
    </div>
  );
};
