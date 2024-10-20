import { z } from "zod";

export const WorkFormSchema = z.object({
  title: z.string(),
  date: z.string().refine(
    (date) => {
      const currentDate = new Date(date);
      const today = new Date();
      return currentDate <= today;
    },
    {
      message: "Date cannot be in the future",
    },
  ),
  image: z.string().url(),
  description: z.string(),
  project_link: z.string().url(),
});

export type TWorkForm = z.infer<typeof WorkFormSchema>;
