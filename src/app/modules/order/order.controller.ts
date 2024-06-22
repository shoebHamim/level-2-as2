import { TProduct } from "../product/product.interface";
import { productService } from "../product/product.service";
import orderService from "./order.service";
import { OrderValidationSchema } from "./order.validation";
import { Request, Response } from "express";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParseData = OrderValidationSchema.parse(orderData);
    const productId = zodParseData.productId;
    // check product stock
    const productData: TProduct | null =
      await productService.findProductByIDFromDB(productId);
    if (!productData) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      if (productData.inventory.quantity - zodParseData.quantity < 0) {
        res.status(503).json({
          success: false,
          message: "Insufficient quantity available in inventory",
        });
      } else {
        //reduce the quantity

        productData.inventory.quantity -= zodParseData.quantity;
        if (productData.inventory.quantity == 0) {
          productData.inventory.inStock = false;
        }
        const quantityReduced = await productService.updateProductByIdFromDB(
          productId,
          productData
        );
        // make the order
        const result = await orderService.createOrderToDB(zodParseData);

        res.json({
          success: true,
          message: "Order created successfully!",
          data: result,
        });
      }
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

const findAllOrders = async (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    try {
      const result = await orderService.findAllOrdersFromDB();
      res.json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } catch (err) {
      sendErrorResponse(res, err);
    }
  } else {
    try {
      const result = await orderService.findAllOrdersByEmailFromDB(
        req.query.email as string
      );
      res.json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } catch (err) {
      sendErrorResponse(res, err);
    }
  }
};

const sendErrorResponse = (res: Response, err: any) => {
  res.status(500).json({
    success: false,
    message: "something went wrong!",
    error: err,
  });
};

export default {
  createOrder,
  findAllOrders,
};
