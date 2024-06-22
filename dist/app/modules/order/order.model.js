"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const order_schema_1 = require("./order.schema");
exports.orderModel = (0, mongoose_1.model)('orders', order_schema_1.OrderSchema);
