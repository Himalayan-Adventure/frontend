import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const MAX_IMAGE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};
export const BlogFormSchema = z.object({
  title: z.string(),
  // image: z.string().url(),
  // image: z
  //   .any()
  //   .refine((files) => files?.length == 1, "Image is required.")
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`,
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     ".jpg, .jpeg, .png and .webp files are accepted.",
  //   )
  //   .optional(),
  //image: z.instanceof(FileList).optional(),
  image: z.preprocess((value) => value, z.instanceof(File)).optional(),
  categories: z.string().optional(),
  description: z.string(),
  slug: z.string(),
});

export type TBlogForm = z.infer<typeof BlogFormSchema>;
