import { z } from "zod";

const profileValidator = z.object({
  fullName: z.string(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  profile: z.object({
    isStudent: z.boolean(),
    canvasApiKey: z.string().nullable(),
  }),
});

const passwordValidator = z
  .object({
    currPassword: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error path
  });

export { profileValidator, passwordValidator };
