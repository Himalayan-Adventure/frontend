"use client";
import { cn, formatDate } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { PenLine, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Text } from "../ui/text";
import { APIResponseData } from "@/types/types";
import Link from "next/link";
import { deleteWork } from "@/server/work/delete-work";
import { toast } from "sonner";

export const WorkCard = ({
  data,
  index,
  type = "default",
}: {
  data: APIResponseData<"api::work.work">;
  index: number;
  type?: "edit" | "default";
}) => {
  const [showMore, setShowMore] = useState(false);
  const work = {
    id: data?.id,
    title: data?.attributes?.title,
    image: data?.attributes?.image?.data?.[0]?.attributes,
    date: data?.attributes?.createdAt?.toString(),
    content: data?.attributes?.description,
  };

  return (
    <article
      className={cn(
        index % 2 === 0 ? "@3xl:flex-row" : "@3xl:flex-row-reverse",
        "relative flex min-h-96 flex-col justify-between gap-y-3 @3xl:items-center",
        type === "edit" && "gap-x-10",
      )}
    >
      <Image
        src={
          work.image?.url ||
          "https://fastly.picsum.photos/id/533/300/300.jpg?hmac=2IKahPfwQQAogvh77xn3cWFO7CcAnTejuf1hGKSi3fI"
        }
        width={work.image?.width || 533}
        height={work.image?.height || 300}
        alt={`image of work titled ${work.title}`}
        className="max-h-96 w-full max-w-[50%] basis-1/2 object-cover saturate-0"
      />

      {/* Details*/}

      <div
        className={cn(
          type === "default"
            ? index % 2 === 0
              ? "@3xl:-left-1/4"
              : "@3xl:-right-1/4"
            : "",
          "relative z-10 flex flex-col gap-y-2",
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
          <Link href={`/dashboard/work/edit/${data.id}`}>
            <Button className="bg-black text-sm text-white">
              <PenLine size={16} />
              Edit
            </Button>
          </Link>
          <Button
            className="bg-black text-sm text-white"
            onClick={async () => {
              try {
                await deleteWork(work.id);
                toast.success("Work deleted successfully");
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Trash size={16} />
            Delete
          </Button>
        </span>
        <div className={cn("rounded-3xl bg-black/70 py-5 text-white")}>
          {/* Title */}
          <div className="space-y-4">
            <div className="w-full space-y-1 px-4 [&>p]:text-left @3xl:[&>p]:px-16">
              {work.date && (
                <Text variant="text-xs" className="text-[10px] uppercase">
                  {formatDate(work.date)}
                </Text>
              )}
              <Text variant="text-lg" className="text-center uppercase">
                {work.title}:
              </Text>
            </div>
            <Separator className="h-px w-full bg-white" />
          </div>

          {/* Description */}
          <div className="relative flex w-full flex-col space-y-4 px-4 @3xl:px-16">
            {work.content && (
              <Text
                variant="text-xs"
                className={cn(
                  "hide-scrollbar w-full overflow-y-scroll text-balance py-5 tracking-wider @3xl:max-w-[350px]",
                )}
              >
                {work.content.length < 400
                  ? work.content
                  : showMore
                    ? work.content
                    : work.content?.slice(0, 400) + "..."}
              </Text>
            )}
            {work.content && work.content?.length > 400 && (
              <Button
                className="w-fit self-end rounded-none bg-black uppercase"
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore ? "Read more" : "Read less"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
