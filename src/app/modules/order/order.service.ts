import { TOrder } from "./order.interface";
import { orderModel } from "./order.model";

const createOrderToDB = async (orderData: TOrder) => {
  return await orderModel.create(orderData);
};

const findAllOrdersFromDB = async () => {
  return await orderModel.find({});
};

const findAllOrdersByEmailFromDB = async (givenEmail: string) => {
  return await orderModel.find({ email: givenEmail });
};

export default {
  createOrderToDB,
  findAllOrdersFromDB,
  findAllOrdersByEmailFromDB,
};
