import {  model } from "mongoose";
import { TOrder } from "./order.interface";
import { OrderSchema } from "./order.schema";

export const orderModel=model<TOrder>('orders',OrderSchema)
