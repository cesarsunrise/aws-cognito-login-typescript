import { DataTypes, Model, Optional } from "sequelize";
import { IOrder } from "../data/interfaces/";
import { DBConnection } from "../connection";

type OrderOptionals = Optional<IOrder, "id">;

export class Order extends Model<IOrder, OrderOptionals> implements IOrder {
  declare order_id?: string;
  declare status?: number;
}

Order.init(
  {
    order_id: DataTypes.STRING(255),
    status: DataTypes.BOOLEAN,
  },
  {
    sequelize: DBConnection.getInstance(),
    modelName: "Order",
    tableName: "orders",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
