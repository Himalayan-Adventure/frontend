import { z } from "zod";
export const ServiceFormSchema = z.object({
  title: z.string(),
  image: z.preprocess((value) => value, z.instanceof(File)).optional(),
  booking_charge: z.coerce.number().optional(),
  service_charge: z.coerce.number().optional(),
  categories: z.string().optional(),
});

export type TServiceForm = z.infer<typeof ServiceFormSchema>;
