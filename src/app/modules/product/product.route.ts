import express, { Router } from "express";
import { productController } from "./product.controller";

const router: Router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.get("/:productId", productController.findProductById);
router.put("/:productId", productController.updateProductById);
router.delete("/:productId", productController.deleteProductById);
router.all('/*',productController.noRouteFound)


export const productRoute = router;
