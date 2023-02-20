import express, { Router, Request, Response, NextFunction } from "express";

const order: Router = express.Router();

export interface CognitoRequest extends Request {
  scopes?: string[];
}

order.get(
  "/",
  async (req: CognitoRequest, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "success orders", scopes: req.scopes });
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
