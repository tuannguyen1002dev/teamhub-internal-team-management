import { z } from "zod"

export const setupAccountSchema = z
  .object({
    email: z
      .email("Invalid email"),

    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "incorrect username"
      ),

    fullname: z
      .string()
      // .transform((v) => (v === "" ? undefined : v))
      .refine(
        (v) =>
          v == null ||
          /^(?:\p{Lu}\p{Ll}+(?:['\-\. ]\p{Lu}\p{Ll}+){0,48})$/u.test(v),
        { message: "this is not an actual name for a person" }
      ),

    phone: z
      .string()
      // .transform((v) => (v === "" ? undefined : v))
      .refine(
        (v) => v == null || /^\+?[1-9]\d{1,14}$/.test(v),
        { message: "invalid phone number" }
      ),

    address: z
      .string()
      .min(1, "Address is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must include: A-Z, 0-9, and a symbol"
      ),

    confirmPassword: z
      .string()
      .min(1, "Please re-enter the password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm passwords must match",
    path: ["confirmPassword"],
  })

export type SetupAccountFormValues = z.infer<typeof setupAccountSchema>

