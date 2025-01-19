import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// application routes
app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};

const test = (req: Request, res: Response) => {
  Promise.reject();
};

app.get("/", getAController);

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
