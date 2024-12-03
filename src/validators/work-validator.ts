import { z } from "zod";

export const WorkFormSchema = z.object({
  title: z.string(),
  date: z
    .string()
    .refine(
      (date) => {
        const currentDate = new Date(date);
        const today = new Date();
        return currentDate <= today;
      },
      {
        message: "Date cannot be in the future",
      },
    )
    .optional(),
  image: z.preprocess((value) => value, z.instanceof(File)).optional(),
  description: z.string().optional(),
  link: z.string().url().optional(),
});

export type TWorkForm = z.infer<typeof WorkFormSchema>;
