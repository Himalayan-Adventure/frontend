import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 letters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "Password should be at least 6 letters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),
    code: z.string().min(1, { message: "Token not available" }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type TResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

// export const RegisterPayloadSchema = z.object({
//   username: z.string().min(1, { message: "Please enter a name" }),
//   email: z.string().email(),
//   phone: z
//     .string()
//     .min(9)
//     .regex(
//       /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/,
//       "Please enter a valid phone number",
//     ),
//   password: z
//     .string()
//     .min(6, { message: "Password should be at least 6 letters" })
//     .max(20, { message: "Password cannot exceed 20 characters" }),
//   userType: z.enum(["merchant", "customer"]),
// });

// export type TRegisterPayload = z.infer<typeof RegisterPayloadSchema>;
