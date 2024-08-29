import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 letters" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
});

export type TLoginForm = z.infer<typeof LoginFormSchema>;
