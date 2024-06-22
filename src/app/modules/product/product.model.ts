import { model } from "mongoose";
import { TProduct } from "./product.interface";
import { productSchema } from "./product.schema";


export const productModel=model<TProduct>('products',productSchema)
