import express, { Router } from "express";
import auth from "./auth";
import order from "./orders";
import { cognitoAuthMiddleware, scopesMiddleware } from "../middlewares";

const api: Router = express.Router();

api.use(auth);
//api.use("/oauth2/callback", auth);
//api.use("/orders", cognitoAuthMiddleware, scopesMiddleware, order);

export default api;
