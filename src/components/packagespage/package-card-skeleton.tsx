"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
export const PackageCardSkeleton = () => {
  return (
    <div
      className={cn(
        "container w-full transform cursor-pointer overflow-hidden rounded-xl p-4 transition-transform",
      )}
    >
      <div className="relative grid h-full w-full gap-4 gap-x-4 space-x-10 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-96 max-h-[70%] w-full rounded rounded-es-3xl rounded-se-3xl object-cover md:hidden" />
        {Array.from({ length: 5 })?.map((image: any, index: number) => (
          <div
            key={`skeleton-pkg-card-${index}`}
            className="relative h-full w-full space-y-2"
          >
            <Skeleton className="hidden h-72 w-full rounded rounded-es-3xl rounded-se-3xl object-cover md:block" />
            <div className="bottom-0 space-y-1">
              <Skeleton className="h-[2ch] w-full bg-muted/60" />
              <Skeleton className="h-[3ch] w-full bg-muted/60" />
              <Skeleton className="h-[5ch] w-full bg-muted/60"></Skeleton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
