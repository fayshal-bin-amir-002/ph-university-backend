import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { createStudentValidationSchema } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { changeStatusValidationSchema } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

// create student route
router.post(
  "/create-student",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get(
  "/me",
  auth(
    USER_ROLE.student,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.superAdmin,
  ),
  UserControllers.getMe,
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(changeStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoutes = router;
