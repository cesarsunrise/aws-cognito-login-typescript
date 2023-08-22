import { Model, Optional } from "sequelize";
import { IOrder } from "../data/interfaces/";
type OrderOptionals = Optional<IOrder, "id">;
export declare class Order extends Model<IOrder, OrderOptionals> implements IOrder {
    order_id?: string;
    status?: number;
}
export {};
