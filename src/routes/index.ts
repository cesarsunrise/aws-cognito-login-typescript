import express, { Router } from "express";
import auth from "./auth";
import order from "./orders";
import { cognitoAuthMiddleware, scopesMiddleware } from "../middlewares";

const api: Router = express.Router();

api.use("/auth", auth);
api.use("/orders", cognitoAuthMiddleware, scopesMiddleware, order);

export default api;
