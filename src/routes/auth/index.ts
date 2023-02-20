import express, { Router, Request, Response, NextFunction } from "express";
import EnvManager from "../../config/EnvManager";
import CognitoConnector from "../../core/connector/CognitoConnector";

const auth: Router = express.Router();

auth.post(
  "/sign-up",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "success" });
    } catch (err: any) {
      err.status = 404;
      next(err);
    }
  }
);

auth.post("/sign-in", async (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});

auth.get("/login-url", async (req: Request, res: Response) => {
  const userId = "abcde-123"; //oauth2 state
  const scopes = ["shopify_api/orders.read"]; //oauth2 array scopes

  const loginUrl = EnvManager.getCognitoLoginUrl(userId, scopes);

  const locals = {
    loginUrl,
  };

  res.render("loginUrl", locals);
});

// Cognito Callback URL
auth.get("/login", async (req: Request, res: Response) => {
  console.log("QUERY PARAMS");
  console.log(req.query);

  const { code } = req.query;

  const connector = new CognitoConnector();
  const tokens = await connector.getTokens(String(code));

  const { access_token } = tokens.data;
  res.status(200).json({ message: "success", accessToken: access_token });
});

export default auth;
