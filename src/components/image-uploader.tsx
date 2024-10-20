"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader({
  open,
  onOpenChange,
  onUploadComplete,
  endpoint,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: (url: string) => void;
  endpoint: "blog" | "news";
}) {
  const [file, setFile] = useState<File | null>(null);

  const { mutate: upload, isPending } = useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios({
          method: "PUT",
          baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
          url: `/${endpoint}`,
          data: formData,
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        toast.error("Failed to upload image");
        console.error(error);
      }
    },
    onSuccess: (data) => {
      onUploadComplete(data);
    },
    onSettled: () => {
      setFile(null);
      onOpenChange(false);
    },
  });

  const uploadHandler = () => {
    if (file) {
      upload(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
        </DialogHeader>

        {file ? (
          <div className="relative h-40 w-full">
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/60 bg-opacity-50"
              style={{ zIndex: 1 }}
            >
              <Upload className="size-8 text-gray-100" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <Input
            placeholder="Upload image"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFile(file);
              }
            }}
          />
        )}

        <Button
          disabled={isPending || !file}
          isLoading={isPending}
          variant="default"
          className="h-10"
          onClick={uploadHandler}
        >
          <Upload className="mr-2 size-5 text-white/90" />
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
}
