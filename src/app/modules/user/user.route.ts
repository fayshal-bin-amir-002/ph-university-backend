import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

export const UserRoutes = router;

// create student route
router.post("/create-student", UserControllers.createStudent);
