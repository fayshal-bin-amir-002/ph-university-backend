import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will call controller func
// get all students route
router.get("/", StudentControllers.getAllStudents);

// get a single student route
router.get("/:id", StudentControllers.getSingleStudentData);

// delete a student data
router.delete("/:id", StudentControllers.deleteStudentData);

export const StudentRoutes = router;
