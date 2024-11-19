"use client";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import rehypeSanitize from "rehype-sanitize";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TWorkForm, WorkFormSchema } from "@/validators/work-validator";
import FileDropZone from "@/components/ui/file-dropzone";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";
import { GoBackButton } from "@/components/profile/go-back-button";
import { APIResponse } from "@/types/types";
import { urlToFile } from "@/lib/utils";
import { addWork } from "@/server/work/add-work";
import { editWork } from "@/server/work/edit-work";
import { Textarea } from "@/components/ui/textarea";

type WorkAddOrEditProps =
  | { type: "add"; data?: never; id?: never }
  | { type: "edit"; data: APIResponse<"api::work.work">; id: number };
export const WorkAddOrEditForm = ({ type, data, id }: WorkAddOrEditProps) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const work = data?.data?.attributes;
  const image = work?.image?.data?.[0]?.attributes;
  useEffect(() => {
    const getBlob = async () => {
      if (!image?.url) return;
      const imageBlob = await urlToFile(
        image?.url,
        image?.name || data?.data.attributes.title + " thumbnail",
      );
      setFile(imageBlob);
    };
    //eslint-disable-next-line
    getBlob();
  }, []);
  const form = useForm<TWorkForm>({
    resolver: zodResolver(WorkFormSchema),
    defaultValues: {
      title: work?.title || "",
      date: work?.date?.toString() || "",
      description: work?.description || "",
      link: work?.link || "",
      image: file,
    },
  });

  async function onSubmit(values: TWorkForm) {
    setLoading(true);
    const payload = { ...form.getValues() };

    if (type === "edit") {
      const res = await editWork(payload, id);

      if (res.status === 200) {
        toast.success("Edited work successfully");
        router.back();
      }
    } else {
      const res = await addWork(payload);

      if (res.status === 200) {
        toast.success("Added work successfully");
        router.back();
      }
    }
    toast.success("Edited successfully");
  }
  useEffect(() => {
    console.log(form.getValues());
  }, [form]);
  return (
    <section className="container mx-auto max-w-4xl">
      <Suspense>
        <GoBackButton className="my-5" />
      </Suspense>
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          {type} Work
        </Text>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Enter date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-1.5">
            <FormLabel className="dark:text-gray-100">Image</FormLabel>
            <FileDropZone
              required={true}
              value={file}
              onChange={(file) => {
                if (file) {
                  setFile(file);
                } else {
                  setFile(undefined);
                }
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Work</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your work"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              onClick={() => {
                form.setValue("image", file);
                form.handleSubmit(onSubmit);
              }}
              //disabled={!form.formState.isValid}
              className="w-fit items-center gap-x-3 self-start rounded-full bg-foreground px-10 py-6 font-poppins font-bold"
              isLoading={loading}
            >
              Done
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
