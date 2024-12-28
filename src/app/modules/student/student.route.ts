import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.zod.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// will call controller func
// get all students route
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.getAllStudents,
);

// get a single student route
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  StudentControllers.getSingleStudentData,
);

// delete a student data
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.deleteStudentData,
);

// update student data
router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudentData,
);

export const StudentRoutes = router;
