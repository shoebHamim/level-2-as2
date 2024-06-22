"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("./order.controller"));
const product_controller_1 = require("../product/product.controller");
const router = express_1.default.Router();
router.post('/', order_controller_1.default.createOrder);
router.get('/', order_controller_1.default.findAllOrders);
router.all('/*', product_controller_1.productController.noRouteFound);
exports.orderRoute = router;
