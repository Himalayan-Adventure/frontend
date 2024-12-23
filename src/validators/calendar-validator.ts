import { z } from "zod";
export const CalendarFormSchema = z.object({
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  is_available: z.boolean(),
  heading: z.string().optional(),
  notes: z.string().optional(),
  guides: z.number().optional(),
});

export type TCalendarForm = z.infer<typeof CalendarFormSchema>;
