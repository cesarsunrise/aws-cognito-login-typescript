import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/errorResponse";

export const catchAllErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    if (err.isJoi) {
      res.status(422).json({
        message: "Validation error",
        errors: err.details.map((item: { message: string; type: string }) => ({
          message: item.message.replaceAll(`\"`, `'`),
          type: item.type,
        })),
      });
      return;
    }
    const statusCode = err.status || 500;
    res.status(statusCode).json(errorResponse(err));
  }
};
