import { z } from "zod";
function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/;

  return phoneRegex.test(phone);
}

export const BookAppointmentFormSchema = z.object({
  appointment_date: z.coerce.date(),
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  email: z.string({ required_error: "Email is required" }).email(),
  //subject: z.string({ required_error: "Subject is required" }).min(10),
  expectation: z
    .string({ required_error: "Expectation is required" })
    .min(10, { message: "Expectation must be at least 10 characters." })
    .max(500, { message: "Expectation must be at most 500 characters." }),

  guide: z.coerce.number({ required_error: "Guide is required" }),
  package: z.coerce.number().optional(),
  requested_by: z.coerce.number(),
});

export type TBookAppointmentSchemaProvider = z.infer<
  typeof BookAppointmentFormSchema
>;
