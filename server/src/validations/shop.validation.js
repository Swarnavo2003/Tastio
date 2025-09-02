import z from "zod";

export const createShopSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  city: z.string().min(3, "City must be at least 3 characters long"),
  state: z.string().min(3, "State must be at least 3 characters long"),
  address: z.string().min(3, "Address must be at least 3 characters long"),
});

export const updateShopSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  city: z.string().min(3, "City must be at least 3 characters long").optional(),
  state: z
    .string()
    .min(3, "State must be at least 3 characters long")
    .optional(),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters long")
    .optional(),
});
