import { Request, Response, NextFunction } from "express";
import { CognitoRequest } from "../routes/orders";

export const scopesMiddleware = (
  req: CognitoRequest,
  res: Response,
  next: NextFunction
) => {
  const scopes = req.scopes;
  const baseUrl = req.baseUrl;
  const method = req.method;

  const permissions: any = {
    "/api/orders": {
      GET: ["shopify_api/orders.read", "full"],
      POST: ["shopify_api/orders.write"],
    },
  };

  const allowedScopes = permissions[baseUrl][method];
  const access = scopes?.some((scope) => allowedScopes.includes(scope));
  if (!access) {
    return res.status(401).send({ message: "Access denied." });
  }

  next();
};
