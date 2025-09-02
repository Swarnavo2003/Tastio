import z from "zod";

export const addItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  price: z.string().min(1, "Price must be greater than 0"),
  foodType: z.enum(["Veg", "Non-Veg"]),
  category: z.enum([
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ]),
});
