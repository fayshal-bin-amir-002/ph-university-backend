import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "./student.interface";
import catchAsync from "../../utils/catchAsync";
// import studentValidationSchema from "./student.validation";

// controller for getting all students data
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb(req.query);
  sendResponse(res, true, 200, "Successfully get all students data.", result);
});

// controller for getting a single student data
const getSingleStudentData: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const result = await StudentServices.getSingleStudentData(id);

  res.status(200).json({
    success: true,
    message: "Successfully get student data.",
    data: result,
  });
});

// controller for delete a single student data
const deleteStudentData: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const result = await StudentServices.deleteStudentFromDb(id);

  res.status(200).json({
    success: true,
    message: "Successfully deleted student data.",
    data: result,
  });
});

const updateStudentData: RequestHandler = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  const result = await StudentServices.updateStudentDataIntoDb(
    id,
    req.body.student,
  );

  sendResponse(res, true, 200, "Successfully updated students data.", result);
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
  updateStudentData,
};
