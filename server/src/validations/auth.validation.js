import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be at most 50 characters long"),
  email: z.string().min(3, "Email must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  mobile: z
    .number()
    .min(10, "Mobile number must be at least 10 characters long"),
  role: z.enum(["user", "owner", "deliveryBoy"]),
});
