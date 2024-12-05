import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { createStudentValidationSchema } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// create student route
router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
