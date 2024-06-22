import { z } from "zod";

const variantSchema = z.object({
  type: z.string().min(1, { message: "Type cannot be empty" }),
  value: z.string().min(1, { message: "Value cannot be empty" })
});

const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category cannot be empty" }),
  tags: z.array(z.string().min(1, { message: "Tags cannot be empty strings" })),
  variants: z.array(variantSchema), 
  inventory: z.object({
    quantity: z.number().nonnegative({ message: "Quantity cannot be negative" }),
    inStock: z.boolean()
  })
});

export default productValidationSchema;