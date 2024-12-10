import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interface";
import catchAsync from "../../utils/catchAsync";
// import userValidationSchema from "./user.validation";

// controller for create a student
const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDb(password, studentData);

  // send response
  sendResponse(res, true, 200, "Student is created successfully", result);
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, true, 200, "Faculty is created succesfully", result);
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);
  sendResponse(res, true, 200, "Admin is created succesfully", result);
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
