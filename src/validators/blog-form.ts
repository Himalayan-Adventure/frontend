import { z } from "zod";
export const BlogFormSchema = z.object({
  title: z.string(),
  image: z.preprocess((value) => value, z.instanceof(File)).optional(),
  blog_categories: z.string().optional(),
  description: z.string(),
  slug: z.string(),
});

export type TBlogForm = z.infer<typeof BlogFormSchema>;
