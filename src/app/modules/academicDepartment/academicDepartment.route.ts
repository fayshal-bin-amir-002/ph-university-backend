import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { AcademicDepartmentValidationSchema } from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(AcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartmemt,
);

router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:departmentId",
  AcademicDepartmentControllers.updateAcademicDeartment,
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;
