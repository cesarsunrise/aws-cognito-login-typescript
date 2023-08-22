import { IOrder, ModelStatic } from "@sunrise/validatorhelper";
import OrderRepositoryInterface from "../OrderRepositoryInterface";

class OrderRepository implements OrderRepositoryInterface {
  constructor(private readonly orderModel: ModelStatic<any>) {}

  all(): Promise<IOrder[]> {
    return this.orderModel.findAll();
  }

  find(id: string | number): Promise<IOrder | null> {
    return this.orderModel.findByPk(id);
  }

  create(data: any): Promise<IOrder> {
    return this.orderModel.create(data);
  }
}

export default OrderRepository;
