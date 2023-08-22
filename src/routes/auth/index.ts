import express, { Router, Request, Response, NextFunction } from "express";
import EnvManager from "../../config/EnvManager";
import CognitoConnector from "../../core/connector/CognitoConnector";
import jsforce from "jsforce";

// https://diego-shopify-okc.ngrok.io/oauth2/auth

const auth: Router = express.Router();
const redirectUri = "https://diego-shopify-okc.ngrok.io/getAccessToken";

let oauth2 = new jsforce.OAuth2({
  loginUrl: "https://okcapsule.my.salesforce.com",
  clientId:
    "3MVG9IHf89I1t8hoRGh7Wa.a6j2SAzvjfsqbhALP8qMkfjfhw60ke4Ts3NPVM5croctOdxCTgOskMRLBKc6kD",
  clientSecret:
    "28F4C2B82F5E5ACCCDC7E07500C73E8D68A37A5DEF42B00A8E41CAEFA85D515A",
  redirectUri,
});

if (EnvManager.getSalesForceEnv() !== "prod") {
  oauth2 = new jsforce.OAuth2({
    loginUrl: "https://okcapsule--full.sandbox.my.salesforce.com",
    clientId:
      "3MVG93MGy9V8hF9OC8YLzPFrS1razOLPQJb1RW8L7GR4yTniWY6Ksc59YKZCifjcEf2i61eIA71W6nYlbWXvR",
    clientSecret:
      "1B15E339A77575EB84975F45028B446B9E3679654B57F9916C70378C6E02C743",
    redirectUri,
  });
}

auth.get("/oauth2/auth", async (req: Request, res: Response) => {
  res.redirect(oauth2.getAuthorizationUrl({ scope: "api" }));
});

auth.get("/getAccessToken", async (req: Request, res: Response) => {
  const conn = new jsforce.Connection({ oauth2: oauth2 });
  const { code } = req.query;
  conn.authorize(code as string, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log(`CREDENTIALS FOR ${EnvManager.getSalesForceEnv()}====`);
    console.log("accessToken", conn.accessToken);
    console.log("refreshToken", conn.refreshToken);
    console.log("instanceUrl", conn.instanceUrl);

    const result: any = {
      env: EnvManager.getSalesForceEnv(),
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken,
      instanceUrl: conn.instanceUrl,
    };

    res.json(result);
  });
});

// auth.post(
//   "/sign-up",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       res.status(200).json({ message: "success" });
//     } catch (err: any) {
//       err.status = 404;
//       next(err);
//     }
//   }
// );

// auth.post("/sign-in", async (req: Request, res: Response) => {
//   res.status(200).json({ message: "success" });
// });

// auth.get("/login-url", async (req: Request, res: Response) => {
//   const userId = "abcde-123"; //oauth2 state
//   const scopes = ["orders/orders:read"]; //oauth2 array scopes

//   const loginUrl = EnvManager.getCognitoLoginUrl(userId, scopes);

//   const locals = {
//     loginUrl,
//   };

//   res.render("loginUrl", locals);
// });

// auth.get("/login", async (req: Request, res: Response) => {
//   console.log("QUERY PARAMS");
//   console.log(req.query);

//   const { code } = req.query;

//   const connector = new CognitoConnector();
//   const tokens = await connector.getTokens(String(code));

//   const { access_token } = tokens.data;
//   res.status(200).json({ message: "success", accessToken: access_token });
// });

export default auth;
