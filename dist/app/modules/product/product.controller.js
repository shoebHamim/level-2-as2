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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    let result;
    let message;
    try {
        if (searchTerm) {
            result = yield product_service_1.productService.findProductsByTagFromDB(req.query.searchTerm);
            message = `Products matching search term ${searchTerm} fetched successfully!`;
        }
        else {
            result = yield product_service_1.productService.getAllProductsFromDB();
            message = "Products fetched successfully!";
        }
        res.json({
            success: true,
            message,
            data: result,
        });
    }
    catch (err) {
        res.send("something went wrong!");
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParseData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.productService.createProductToDB(zodParseData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        sendErrorResponse(res, err);
    }
});
const findProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.findProductByIDFromDB(req.params.productId);
        if (!result) {
            res.status(404).json({
                success: true,
                message: "No Product Found!",
                data: result,
            });
        }
        else {
            res.json({
                success: true,
                message: "Product fetched successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        sendErrorResponse(res, err);
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.updateProductByIdFromDB(req.params.productId, req.body);
        if (!result) {
            res.status(404).json({
                success: true,
                message: "No Product Found to Update!",
                data: result,
            });
        }
        else {
            res.json({
                success: true,
                message: "Product updated successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        sendErrorResponse(res, err);
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.deleteProductByIdFromDB(req.params.productId);
        if (!result.deletedCount) {
            res.status(404).json({
                success: true,
                message: "No Product Found to Delete!",
                data: result,
            });
        }
        else {
            res.json({
                success: true,
                message: "Product deleted successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        sendErrorResponse(res, err);
    }
});
const sendErrorResponse = (res, err) => {
    res.status(500).json({
        success: false,
        message: "something went wrong!",
        error: err,
    });
};
const noRouteFound = (req, res) => {
    res.json({
        success: false,
        message: "Route not found",
    });
};
exports.productController = {
    getAllProducts,
    createProduct,
    findProductById,
    updateProductById,
    deleteProductById,
    noRouteFound,
};
