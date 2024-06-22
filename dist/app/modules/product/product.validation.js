"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Type cannot be empty" }),
    value: zod_1.z.string().min(1, { message: "Value cannot be empty" })
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
    description: zod_1.z.string().min(10, { message: "Description must be at least 10 characters long" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Category cannot be empty" }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: "Tags cannot be empty strings" })),
    variants: zod_1.z.array(variantSchema),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().nonnegative({ message: "Quantity cannot be negative" }),
        inStock: zod_1.z.boolean()
    })
});
exports.default = productValidationSchema;
