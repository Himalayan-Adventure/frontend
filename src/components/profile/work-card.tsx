"use client";
import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { getWorks } from "@/server/work/get-works";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { PenLine, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { WorkCard } from "../work/work-card";
export const WorkCards = () => {
  const { data: works, isPending } = useQuery({
    queryKey: ["works"],
    queryFn: async () => await getWorks(),
  });

  const [limit, setLimit] = useState(6);
  return (
    <div className="rounded-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Work</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>

        {/* Loading state*/}
        {(!works || isPending) && (
          <Skeleton className="grid grid-cols-2">
            <Skeleton />
            <Skeleton />
          </Skeleton>
        )}

        {/* Works*/}
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-8">
            {works?.data
              ?.slice(0, limit)
              ?.map((work, index) => (
                <WorkCard
                  type="default"
                  data={work}
                  index={index}
                  key={`work-${index}`}
                />
              ))}
          </div>

          {works?.data && (
            <Button
              className="self-center bg-foreground px-8 py-4"
              onClick={() =>
                setLimit((prev) => {
                  return limit < works?.data?.length ? prev + 2 : prev - 2;
                })
              }
            >
              {limit < works?.data?.length ? "More..." : "Less..."}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const LegacyWorkCard = ({
  work,
  index,
  type = "default",
}: {
  work: any;
  index: number;
  type?: "edit" | "default";
}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <article
      className={cn(
        index % 2 === 0 ? "@3xl:flex-row" : "@3xl:flex-row-reverse",
        "relative flex min-h-96 flex-col gap-y-3 @3xl:items-center",
        type === "edit" && "gap-x-10",
      )}
    >
      <Image
        src={
          "https://fastly.picsum.photos/id/533/300/300.jpg?hmac=2IKahPfwQQAogvh77xn3cWFO7CcAnTejuf1hGKSi3fI"
        }
        width="533"
        height="300"
        alt={`image of work titled ${work.title}`}
        className="w-full basis-1/2 saturate-0"
      />

      {/* Details*/}

      <div
        className={cn(
          type === "default"
            ? index % 2 === 0
              ? "@3xl:-left-1/4"
              : "@3xl:-right-1/4"
            : "",
          "relative z-10 flex basis-1/3 flex-col gap-y-2",
        )}
      >
        {/* Edit Options */}
        <span
          className={cn(
            type === "default" ? "hidden" : "flex",
            index % 2 === 0 ? "self-end" : "self-start",
            "gap-x-2",
          )}
        >
          <Link href="/dashboard/work/form?type=edit">
            <Button className="bg-black text-sm text-white">
              <PenLine size={16} />
              Edit
            </Button>
          </Link>
          <Button className="bg-black text-sm text-white">
            <Trash size={16} />
            Delete
          </Button>
        </span>
        <div className={cn("rounded-3xl bg-black/70 py-5 text-white")}>
          {/* Title */}
          <div className="space-y-4">
            <div className="w-full space-y-1 px-4 [&>p]:text-left @3xl:[&>p]:px-16">
              <Text variant="text-xs" className="text-[10px] uppercase">
                {work.date}
              </Text>
              <Text variant="text-lg" className="text-center uppercase">
                {work.title}:
              </Text>
            </div>
            <Separator className="h-px w-full bg-white" />
          </div>

          {/* Description */}
          <div className="flex w-full flex-col space-y-4 px-4 @3xl:px-16">
            <Text
              variant="text-xs"
              className={cn(
                "hide-scrollbar overflow-y-scroll text-balance py-5 tracking-wider @3xl:min-w-[350px]",
              )}
            >
              {showMore ? work.content : work.content.slice(0, 400) + "..."}
            </Text>
            <Button
              className="w-fit self-end rounded-none bg-black uppercase"
              onClick={() => setShowMore(!showMore)}
            >
              {!showMore ? "Read more" : "Read less"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
