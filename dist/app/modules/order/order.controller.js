"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../product/product.service");
const order_service_1 = __importDefault(require("./order.service"));
const order_validation_1 = require("./order.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParseData = order_validation_1.OrderValidationSchema.parse(orderData);
        const productId = zodParseData.productId;
        // check product stock
        const productData = yield product_service_1.productService.findProductByIDFromDB(productId);
        if (!productData) {
            res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        else {
            if (productData.inventory.quantity - zodParseData.quantity < 0) {
                res.status(503).json({
                    success: false,
                    message: "Insufficient quantity available in inventory",
                });
            }
            else {
                //reduce the quantity
                productData.inventory.quantity -= zodParseData.quantity;
                if (productData.inventory.quantity == 0) {
                    productData.inventory.inStock = false;
                }
                yield product_service_1.productService.updateProductByIdFromDB(productId, productData);
                // make the order
                const result = yield order_service_1.default.createOrderToDB(zodParseData);
                res.json({
                    success: true,
                    message: "Order created successfully!",
                    data: result,
                });
            }
        }
    }
    catch (err) {
        sendErrorResponse(res, err);
    }
});
const findAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.query).length === 0) {
        try {
            const result = yield order_service_1.default.findAllOrdersFromDB();
            res.json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
        catch (err) {
            sendErrorResponse(res, err);
        }
    }
    else {
        try {
            const result = yield order_service_1.default.findAllOrdersByEmailFromDB(req.query.email);
            if (!result.length) {
                res.status(404).json({
                    success: false,
                    message: "No order found by user email!",
                    data: result,
                });
            }
            else {
                res.json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result,
                });
            }
        }
        catch (err) {
            sendErrorResponse(res, err);
        }
    }
});
const sendErrorResponse = (res, err) => {
    res.status(500).json({
        success: false,
        message: "something went wrong!",
        error: err,
    });
};
exports.default = {
    createOrder,
    findAllOrders,
};
