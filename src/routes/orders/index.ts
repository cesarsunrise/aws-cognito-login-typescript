import { Order } from "@sunrise/validatorhelper";
import express, { Router, Request, Response, NextFunction } from "express";
import OrderRepository from "../../repositories/sequelize/OrderRepository";

const order: Router = express.Router();

export interface CognitoRequest extends Request {
  scopes?: string[];
}

order.get(
  "/",
  async (req: CognitoRequest, res: Response, next: NextFunction) => {
    try {
      const orderRepository = new OrderRepository(Order);
      const records = await orderRepository.all();
      res
        .status(200)
        .json({ message: "success orders", scopes: req.scopes, records });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  }
);

order.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "success orders POST" });
  } catch (err: any) {
    err.status = 404;
    next(err);
  }
});

export default order;
