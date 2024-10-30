import { z } from "zod";

export const BlogFormSchema = z.object({
  title: z.string(),
  image: z.string().url(),
  categories: z.string().optional(),
  description: z.string(),
});

export type TBlogForm = z.infer<typeof BlogFormSchema>;
