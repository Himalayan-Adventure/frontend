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
import {
  ServiceFormSchema,
  TServiceForm,
} from "@/validators/service-form-validator";
import { getServiceCategories } from "@/server/services/get-services-categories";
import { addService } from "@/server/services/add-service";
import { TUser } from "@/types/auth";
import { editService } from "@/server/services/edit-service";
type ServiceAddOrEditProps =
  | { type: "add"; data?: never; id?: never; user: TUser }
  | {
      type: "edit";
      data: APIResponse<"api::service.service">;
      id: number;
      user?: never;
    };
export const ServiceAddOrEditForm = ({
  type,
  data,
  id,
  user,
}: ServiceAddOrEditProps) => {
  const [file, setFile] = useState<File>();
  //const image = data?.data.attributes.image?.data?.attributes;
  const image = data?.data?.attributes?.image?.data?.attributes;

  //const image = data?.data?.attributes.thumbnail?.data?.attributes;

  const { data: categories, isLoading } = useQuery({
    queryKey: ["service-categories", type, id],
    queryFn: async () => await getServiceCategories(),
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
  const service = {
    title: data?.data?.attributes?.title || "",
    image: file,
    categories: data?.data?.attributes?.categories?.data?.[0]?.id.toString(),
    service_charge: Number(data?.data?.attributes?.service_charge),
    booking_charge: Number(data?.data?.attributes?.booking_charge),
    service_provider:
      data?.data.attributes.service_provider?.data.id || user?.id,
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<TServiceForm>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: service,
  });

  async function onSubmit(values: TServiceForm) {
    setLoading(true);
    const payload = {
      ...form.getValues(),
    };
    if (type === "edit") {
      const res = await editService(payload, data.data.id);
      if (res.status === 200) {
        toast.success("Added service successfully");
        router.refresh();
        router.push("/dashboard/services");
      }
    } else {
      const res = await addService(payload);
      if (res.status === 200) {
        toast.success("Added service successfully");
        router.refresh();
        router.push("/dashboard/services");
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
          {type} Service
        </Text>
      </div>
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service_charge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Charge</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Rs." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="booking_charge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking Charge</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Rs." {...field} />
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

          {isLoading && <Skeleton className="h-12 w-full bg-primary/10" />}

          {categories?.data && categories?.data?.length > 0 && (
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={categories.data
                      .find((i) => i.id === Number(service.categories))
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
                          key={`${i.id}-service-categories`}
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

          <div className="flex flex-col justify-center gap-y-2 sm:justify-center">
            <Button
              type="submit"
              onClick={() => {
                form.setValue("image", file);
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
