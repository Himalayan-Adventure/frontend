import { z } from "zod";

export const ForgotPwdEmailFormSchema = z.object({
  email: z.string().email(),
});

export type TForgotPwdEmailInput = z.infer<typeof ForgotPwdEmailFormSchema>;

export const ForgotPwdNumberFormSchema = z.object({
  number: z
    .string()
    .regex(
      /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/,
      "Please enter a valid phone number",
    ),
});

export type TForgotPwdNumberInput = z.infer<typeof ForgotPwdNumberFormSchema>;
