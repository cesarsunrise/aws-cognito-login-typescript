"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../connection");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    order_id: sequelize_1.DataTypes.STRING(255),
    status: sequelize_1.DataTypes.BOOLEAN,
}, {
    sequelize: connection_1.DBConnection.getInstance(),
    modelName: "Order",
    tableName: "orders",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
//# sourceMappingURL=Order.js.map