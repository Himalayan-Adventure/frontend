"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
export const WorkAddOrEditForm = ({
  type,
  data,
}: {
  type: "edit" | "add";
  data?: TWorkForm;
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const form = useForm<TWorkForm>({
    resolver: zodResolver(WorkFormSchema),
    defaultValues: {
      title: "",
      date: "",
      description: "",
      project_link: "",
      image: "",
    },
  });

  const [content, setContent] = useState<string | undefined>(
    "**Hello World!**",
  );
  async function onSubmit(values: TWorkForm) {
    setLoading(true);
    console.log("hello");
    const payload = { ...form.getValues(), description: content };
    console.log(payload);
    toast.success("Edited successfully");
  }
  useEffect(() => {
    console.log(form.getValues());
  }, [form]);
  return (
    <section className="max-w-4xl">
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
                setFile(file || null);
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
                  <div data-color-mode="light" className="space-y-10">
                    <MDEditor
                      preview="edit"
                      value={content}
                      onChange={setContent}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                    <MDEditor.Markdown
                      source={content}
                      style={{ whiteSpace: "pre-wrap" }}
                      className="rounded-lg border !border-input p-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project_link"
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
              onClick={() => form.handleSubmit(onSubmit)}
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
