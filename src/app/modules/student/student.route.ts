import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.zod.validation";

const router = express.Router();

// will call controller func
// get all students route
router.get("/", StudentControllers.getAllStudents);

// get a single student route
router.get("/:id", StudentControllers.getSingleStudentData);

// delete a student data
router.delete("/:id", StudentControllers.deleteStudentData);

// update student data
router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudentData,
);

export const StudentRoutes = router;
