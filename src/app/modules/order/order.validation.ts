import { z } from 'zod';

export const OrderValidationSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email format" }),
  productId: z.string(),
  price: z.number()
    .positive({ message: "Price must be a positive number" }),
  quantity: z.number()
    .int({ message: "Quantity must be an integer" })
    .positive({ message: "Quantity must be a positive number" })
});