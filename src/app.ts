import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};

app.get("/", getAController);

app.use(globalErrorHandler);

app.use(notFoundRoute);

export default app;
