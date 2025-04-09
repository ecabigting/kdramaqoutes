// ./types/schema/signupFormSchema.ts
import * as z from 'zod';

export const signinFormSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" }),

  password: z.string()
    .min(6, { message: "Password is required." })
});

export type SigninFormData = z.infer<typeof signinFormSchema>;
