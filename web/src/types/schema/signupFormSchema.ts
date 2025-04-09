// ./types/schema/signupFormSchema.ts
import * as z from 'zod';

export const signupFormSchema = z.object({
  displayName: z.string()
    .min(2, { message: "Display name must be at least 2 characters long" })
    .max(50, { message: "Display name must be less than 50 characters" }),

  email: z.string()
    .email({ message: "Invalid email address" }),

  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
      message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol"
    })
});

export type SignupFormData = z.infer<typeof signupFormSchema>;
