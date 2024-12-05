import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  AcademicSemesterValidationSchema,
  UpdateAcademicSemesterValidationSchema,
} from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemester);

router.get("/:_id", AcademicSemesterControllers.getASingleAcademicSemester);

router.patch(
  "/:_id",
  validateRequest(UpdateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
