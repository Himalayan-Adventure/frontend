"use client";
import BlogCard from "@/components/blog/blog-card";
import { WorkCard } from "@/components/profile/work-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { PenLine, PlusIcon, Shapes, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";

export default function WorkPage() {
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
    <section className="space-y-8 font-poppins @container">
      {/*Header*/}
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Work
        </Text>

        <Link href="/profile/work/form?type=add">
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

      {/* Works */}
      <Suspense>
        <div className="rounded-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Works*/}
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-8">
                {works
                  .slice(0, limit)
                  ?.map((work, index) => (
                    <WorkCard
                      work={work}
                      index={index}
                      key={`work-${index}`}
                      type="edit"
                    />
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
      </Suspense>
    </section>
  );
}
