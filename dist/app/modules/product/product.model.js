"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const product_schema_1 = require("./product.schema");
exports.productModel = (0, mongoose_1.model)('products', product_schema_1.productSchema);
