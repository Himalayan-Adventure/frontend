import { z } from "zod";
function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/;

  return phoneRegex.test(phone);
}
export const EditProfileFormSchema = z.object({
  firstname: z.string().min(1, { message: "Please enter a name" }),
  lastname: z.string().optional(),
  email: z.string().email(),
  post: z.string().optional(),
  profile_picture: z
    .preprocess((value) => value, z.instanceof(File))
    .optional(),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  facebook_link: z.string().url().optional(),
  instagram_link: z.string().url().optional(),
  whatsapp_link: z.string().url().optional(),
  about: z.string().optional(),
  location: z.string().optional(),
  portfolio: z.string().url().optional(),
  //  education: z.object({ education: z.string() }).array(),
  education: z.string().optional(),
  hard_skill: z.string().optional(),
  technical_skill: z.string().optional(),
  interest: z.string().optional(),
  birthday: z
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
  gender: z.string(),
  citizenship_no: z.string().optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  marital_status: z.string().optional(),
  // password: z
  //   .string()
  //   .min(6, { message: "Password should be at least 6 letters" })
  //   .max(20, { message: "Password cannot exceed 20 characters" }),
});

export type TEditProfileForm = z.infer<typeof EditProfileFormSchema>;
