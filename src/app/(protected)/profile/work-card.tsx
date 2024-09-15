import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useState } from "react";
export const WorkCards = () => {
  const works = [
    {
      date: "DEC 08, 2020",
      title: "LOREM IPSUM:",
      content:
        "     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut molestiae temporibus modi omnis iste vero cum eius consectetur repudiandae mollitia natus quaerat eveniet ad, hic corporis tempore delectus animi eum velit. Enim qui temporibus est totam alias fugiat eaque vitae odit, laborum quisquam dolore. Nemo, nisi. Molestiae, sint corrupti. lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida ligula ac ligula sollicitudin vehicula. Aenean malesuada feugiat ante, sLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida ligula ac ligula sollicitudin vehicula.",
    },
    {
      date: "JAN 15, 2021",
      title: "DOLOR SIT AMET:",
      content:
        "     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut molestiae temporibus modi omnis iste vero cum eius consectetur repudiandae mollitia natus quaerat eveniet ad, hic corporis tempore delectus animi eum velit. Enim qui temporibus est totam alias fugiat eaque vitae odit, laborum quisquam dolore. Nemo, nisi. Molestiae, sint corrupti. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      date: "FEB 22, 2021",
      title: "NULLAM GRAVIDA:",
      content:
        "     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut molestiae temporibus modi omnis iste vero cum eius consectetur repudiandae mollitia natus quaerat eveniet ad, hic corporis tempore delectus animi eum velit. Enim qui temporibus est totam alias fugiat eaque vitae odit, laborum quisquam dolore. Nemo, nisi. Molestiae, sint corrupti. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      date: "MAR 30, 2021",
      title: "AENEAN MALESUADA:",
      content:
        "     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut molestiae temporibus modi omnis iste vero cum eius consectetur repudiandae mollitia natus quaerat eveniet ad, hic corporis tempore delectus animi eum velit. Enim qui temporibus est totam alias fugiat eaque vitae odit, laborum quisquam dolore. Nemo, nisi. Molestiae, sint corrupti.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      date: "APR 17, 2021",
      title: "VEHICULA FEUGIAT:",
      content:
        "     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate aut molestiae temporibus modi omnis iste vero cum eius consectetur repudiandae mollitia natus quaerat eveniet ad, hic corporis tempore delectus animi eum velit. Enim qui temporibus est totam alias fugiat eaque vitae odit, laborum quisquam dolore. Nemo, nisi. Molestiae, sint corrupti. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    },
  ];

  const [limit, setLimit] = useState(6);
  return (
    <div className="rounded-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Work</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>

        {/* Works*/}
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-8">
            {works
              .slice(0, limit)
              ?.map((work, index) => (
                <WorkCard work={work} index={index} key={`work-${index}`} />
              ))}
          </div>

          <Button
            className="self-center bg-foreground px-8 py-4"
            onClick={() =>
              setLimit((prev) => {
                return limit < works.length ? prev + 2 : prev - 2;
              })
            }
          >
            {limit < works.length ? "More..." : "Less..."}
          </Button>
        </div>
      </div>
    </div>
  );
};

const WorkCard = ({ work, index }: { work: any; index: number }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <article
      className={cn(
        index % 2 === 0 ? "flex-row" : "flex-row-reverse",
        "relative flex min-h-96 items-center",
      )}
    >
      <Image
        src={
          "https://fastly.picsum.photos/id/533/300/300.jpg?hmac=2IKahPfwQQAogvh77xn3cWFO7CcAnTejuf1hGKSi3fI"
        }
        width="533"
        height="300"
        alt={`image of work titled ${work.title}`}
        className="basis-1/2 saturate-0"
      />
      <div
        className={cn(
          index % 2 === 0 ? "-left-1/4" : "-right-1/4",
          "relative z-10 block basis-1/3 rounded-3xl bg-black/70 py-5 text-white",
        )}
      >
        {/* Title */}
        <div className="space-y-4">
          <div className="w-full space-y-1 [&>p]:px-16 [&>p]:text-left">
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
        <div className="flex w-full flex-col space-y-4 px-16">
          <Text
            variant="text-xs"
            className={cn(
              "hide-scrollbar h-[20ch] overflow-y-scroll text-balance py-5 tracking-wider md:min-w-[350px]",
            )}
          >
            {showMore ? work.content : work.content.slice(0, 400) + "..."}
          </Text>
          <Button
            className="w-fit self-end rounded-none bg-black uppercase"
            onClick={() => setShowMore(!showMore)}
          >
            Read more
          </Button>
        </div>
      </div>
    </article>
  );
};
