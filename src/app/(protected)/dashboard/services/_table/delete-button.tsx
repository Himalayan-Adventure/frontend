"use client";

import { Button } from "@/components/ui/button";
import { deleteService } from "@/server/services/delete-service";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: number }) {
  const {
    mutate: deleteMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["services"],
    mutationFn: async () => {
      await deleteService(id);
    },
    onSuccess(data, variables, context) {
      toast.success("Service deleted successfully");
    },
    onError(error, variables, context) {
      toast.error(`Action couldn't be performed ${error}`);
    },
  });
  return (
    <Button
      onClick={() => deleteMutation()}
      isLoading={isPending}
      className="flex h-10 flex-wrap place-items-center gap-1 rounded-lg border border-red-500 bg-red-100 px-2 text-red-900 hover:bg-red-900 hover:text-red-100"
    >
      <Trash size={18} />
    </Button>
  );
}
