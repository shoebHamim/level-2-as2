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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductToDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.create(productData);
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.find({});
});
const findProductByIDFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.findOne({ _id: productId });
});
const updateProductByIdFromDB = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.findOneAndUpdate({ _id: productId }, updatedData, { new: true });
});
const deleteProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.deleteOne({ _id: productId });
});
const findProductByKeyword = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
        ]
    };
    return yield product_model_1.productModel.find(query);
});
exports.productService = {
    createProductToDB,
    getAllProductsFromDB,
    findProductByIDFromDB,
    updateProductByIdFromDB,
    deleteProductByIdFromDB,
    findProductsByTagFromDB: findProductByKeyword
};
