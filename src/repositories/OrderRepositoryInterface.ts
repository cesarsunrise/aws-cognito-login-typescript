import { IOrder } from "../packages/validatorHelper/src/data/interfaces";

export default interface OrderRepositoryInterface {
  all(): Promise<IOrder[]>;
  find(id: number | string): Promise<IOrder | null>;
  create(data: object): Promise<IOrder>;
}
