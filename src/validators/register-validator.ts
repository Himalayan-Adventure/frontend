import { z } from "zod";
function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/;

  return phoneRegex.test(phone);
}
export const RegisterFormSchema = z
  .object({
    username: z.string().min(1, { message: "Please enter a name" }),
    email: z.string().email(),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" })
      .or(z.literal("")),
    // phone: z.string().min(9, "Please enter a valid phone number"),
    // .regex(
    //   /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/,
    //   "Please enter a valid phone number",
    // ),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 letters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password should be at least 6 letters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type TRegisterForm = z.infer<typeof RegisterFormSchema>;

export const RegisterPayloadSchema = z.object({
  username: z.string().min(1, { message: "Please enter a name" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(9)
    .regex(
      /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/,
      "Please enter a valid phone number",
    ),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 letters" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
  userType: z.enum(["merchant", "customer"]),
});

export type TRegisterPayload = z.infer<typeof RegisterPayloadSchema>;
