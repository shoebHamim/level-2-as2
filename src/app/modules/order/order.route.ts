import express, { Router } from "express";
import orderController from "./order.controller";
import { productController } from "../product/product.controller";


const router: Router = express.Router();

router.post('/',orderController.createOrder)
router.get('/',orderController.findAllOrders)

router.all('/*',productController.noRouteFound)


export const orderRoute = router;
