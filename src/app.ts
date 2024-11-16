import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("hello world");
};

app.get("/", getAController);

export default app;
