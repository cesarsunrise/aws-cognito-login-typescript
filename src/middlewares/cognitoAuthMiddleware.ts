import { Request, Response, NextFunction } from "express";
import CognitoVerifyToken from "../libs/CognitoVerifyToken";
import { CognitoRequest } from "../routes/orders";

export const cognitoAuthMiddleware = async (
  req: CognitoRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["x-authorization"];

  if (!authToken) {
    return res.status(401).send({ message: "Unauthorize" });
  }

  const { isValid, error, payload } = await CognitoVerifyToken.verifyToken(
    String(authToken)
  );
  console.log("COGNITO TOKEN VERIFY", payload);
  if (!isValid) {
    return res.status(401).send({ message: error.message });
  }

  req.scopes = payload?.scope.split(" ") || [];
  next();
};
