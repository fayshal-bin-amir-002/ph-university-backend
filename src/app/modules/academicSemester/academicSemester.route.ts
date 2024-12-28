import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  AcademicSemesterValidationSchema,
  UpdateAcademicSemesterValidationSchema,
} from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(AcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  "/",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getAllAcademicSemester,
);

router.get(
  "/:_id",
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getASingleAcademicSemester,
);

router.patch(
  "/:_id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(UpdateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
