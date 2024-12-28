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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import slugify from "slugify";
import rehypeSanitize from "rehype-sanitize";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import FileDropZone from "@/components/ui/file-dropzone";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "sonner";
import { BlogFormSchema, TBlogForm } from "@/validators/blog-form";
import { GoBackButton } from "@/components/profile/go-back-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBlogCategories } from "@/server/blogs/get-blog-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { addBlog } from "@/server/blogs/add-blog";
import { editBlog } from "@/server/blogs/edit-blog";
import { uploadMedia } from "@/server/media/add-media";
import { APIResponse } from "@/types/types";
import { urlToFile } from "@/lib/utils";
import { AxiosError } from "axios";
type BlogAddOrEditProps =
  | { type: "add"; authorID: number; data?: never; id?: never }
  | {
      type: "edit";
      data: APIResponse<"api::blog.blog">;
      id: number;
      authorID?: never;
    };
export const BlogAddOrEditForm = ({
  type,
  authorID,
  data,
  id,
}: BlogAddOrEditProps) => {
  const [file, setFile] = useState<File>();
  const image = data?.data?.attributes.thumbnail?.data?.attributes;

  const { data: categories, isLoading } = useQuery({
    queryKey: ["blog-categories", type, id],
    queryFn: async () => await getBlogCategories(),
  });
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
  const blog = {
    title: data?.data?.attributes?.title || "",
    description: data?.data?.attributes?.description || "",
    image: file,
    categories:
      data?.data?.attributes?.blog_categories?.data?.[0]?.id.toString(),
    slug: data?.data?.attributes?.slug,
    user: data?.data?.attributes?.user,
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TBlogForm>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      blog_categories: blog?.categories || "",
      description: blog?.description || "",
      image: blog?.image,
      slug: blog?.slug,
      user: blog.user?.data.id || authorID,
    },
  });

  const [content, setContent] = useState<string | undefined>(
    blog?.description || "**Hello World!**",
  );
  async function onSubmit(values: TBlogForm) {
    setLoading(true);
    const payload = {
      ...form.getValues(),
      description: content || "",
    };
    if (type === "edit") {
      const res = await editBlog(payload, id);
      if (res.status === 200) {
        toast.success("Edited blog successfully");
        router.refresh();
        router.push("/dashboard/blog");
      }
    } else {
      const res = await addBlog(payload);
      if (res.status === 200) {
        toast.success("Added blog successfully");
        router.refresh();
        router.push("/dashboard/blog");
      }
    }
    setLoading(false);
  }
  return (
    <section className="container max-w-4xl">
      <GoBackButton className="my-5" />
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          {type} Blog
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
          {/*
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="space-y-1.5">
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Picture"
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            */}

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

          {isLoading && <Skeleton className="h-12 w-full bg-primary/10" />}

          {categories?.data && categories?.data?.length > 0 && (
            <FormField
              control={form.control}
              name="blog_categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={categories.data
                      .find((i) => i.id === Number(blog.categories))
                      ?.id.toString()}
                    //defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.data?.map((i) => (
                        <SelectItem
                          key={`${i.id}-blog-categories`}
                          value={i.id.toString()}
                        >
                          {i.attributes.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog</FormLabel>
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

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              onClick={() => {
                form.setValue("image", file);
                form.setValue(
                  "slug",
                  slugify(form.getValues().title, {
                    lower: true,
                    strict: true,
                  }),
                );
                form.handleSubmit(onSubmit);
              }}
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
