import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { Button } from "react-day-picker";
import Link from "next/link";
export const AddButton = () => {
  return (
    <Link href="/profile/blog/form?type=add">
      <Suspense>
        <Button className="bg-black text-sm text-white">
          <PlusIcon size={16} />
          Create
        </Button>
      </Suspense>
    </Link>
  );
};
