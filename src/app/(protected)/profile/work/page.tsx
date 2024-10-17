import BlogCard from "@/components/blog/blog-card";
import { WorkCards } from "@/components/profile/work-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { PlusIcon, Shapes } from "lucide-react";
import { Suspense } from "react";

export default function WorkPage() {
  return (
    <section className="space-y-8 font-poppins">
      <span className="flex gap-x-3">
        <Text variant="display-sm" bold>
          Work
        </Text>
        <Button className="bg-black text-sm text-white">
          <PlusIcon size={16} />
          Add Project
        </Button>
        <Button className="bg-black text-sm text-white">
          <PlusIcon size={16} />
          Upcoming Projects
        </Button>
      </span>

      {/* Works */}
      <Suspense>
        <WorkCards />
      </Suspense>
    </section>
  );
}
