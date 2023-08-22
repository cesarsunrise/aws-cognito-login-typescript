import express, { Express, Request, Response } from "express";
import api from "./routes";
import { catchAllErrorMiddleware, notFoundMiddleware } from "./middlewares";
import path from "path";

const app: Express = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/health", (req: Request, res: Response) => {
  res.send("ok");
});

app.use(api);

app.use(notFoundMiddleware);
app.use(catchAllErrorMiddleware);

export default app;
