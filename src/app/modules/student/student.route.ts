import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will call controller func
// get all students route
router.get("/", StudentControllers.getAllStudents);

// get a single student route
router.get("/:id", StudentControllers.getSingleStudentData);

// create student route
router.post("/create-student", StudentControllers.createStudent);

export const StudentRoutes = router;
