
import { Schema } from "mongoose";
import { TOrder } from "./order.interface";

export const  OrderSchema=new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }

})