import { z } from "zod";
function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/;
  return phoneRegex.test(phone);
}
export const EditProfileFormSchema = z.object({
  username: z.string().min(1, { message: "Please enter a username" }),
  email: z.string().email(),

  profilePicture: z.preprocess((value) => value, z.instanceof(File)).optional(),
  about: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional().or(z.literal("")),
      whatsapp: z.string().url().optional(),
      description: z.string().optional(),
    })
    .optional(),
  resume: z.object({
    first_name: z
      .string()
      .min(1, { message: "Please enter a name" })
      .optional(),
    last_name: z.string().optional(),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
      .or(z.literal(""))
      .optional(),
    email: z.string().email().optional(),
    location: z.string().optional(),
    portfolio: z.string().url().optional(),
    //  education: z.object({ education: z.string() }).array(),
    education: z.string().optional(),
    hard_skill: z.string().optional(),
    technical_skill: z.string().optional(),
    interest: z.string().optional(),
  }),
  contact: z.object({
    email: z.string().email().optional(),
    birthday: z.string().optional(),
    gender: z.string().optional(),
    citizenship: z.string().optional(),
    nationality: z.string().optional(),
    religion: z.string().optional(),
    address: z.string().optional(),
    marital_status: z.string().optional(),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
      .or(z.literal(""))
      .optional(),
  }),
});

export type TEditProfileForm = z.infer<typeof EditProfileFormSchema>;
