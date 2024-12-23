import { z } from "zod";

function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/;

  return phoneRegex.test(phone);
}
export const AdminInquiryFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  email: z.string({ required_error: "Email is required" }).email(),
  subject: z.string({ required_error: "Subject is required" }).min(10),
  message: z.string({ required_error: "Message is required" }).min(10).max(500),
  package: z.coerce.number().optional(),
  service: z.coerce.number().optional(),
});

export type TAdminInquiryForm = z.infer<typeof AdminInquiryFormSchema>;
