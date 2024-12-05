import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidationSchema } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

// create academic faculty route
router.post(
  "/create-academic-faculty",
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
