import { Schema } from "mongoose";
import { TProduct } from "./product.interface";

export const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [Object], required: true },
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
});
