"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = void 0;
const zod_1 = require("zod");
exports.OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email({ message: "Invalid email format" }),
    productId: zod_1.z.string(),
    price: zod_1.z.number()
        .positive({ message: "Price must be a positive number" }),
    quantity: zod_1.z.number()
        .int({ message: "Quantity must be an integer" })
        .positive({ message: "Quantity must be a positive number" })
});
