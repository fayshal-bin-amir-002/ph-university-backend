import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interface";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import config from "../../config";
import { verifyToken } from "../auth/auth.utils";
// import userValidationSchema from "./user.validation";

// controller for create a student
const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDb(
    req.file,
    password,
    studentData,
  );

  // send response
  sendResponse(res, true, 200, "Student is created successfully", result);
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );
  sendResponse(res, true, 200, "Faculty is created succesfully", result);
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );
  sendResponse(res, true, 200, "Admin is created succesfully", result);
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden access.");
  }

  const { role, userId } = req.user;

  const result = await UserServices.getMe(userId, role);
  sendResponse(res, true, 200, "User is retrived successfully", result);
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Status is updated succesfully",
    result,
  );
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
