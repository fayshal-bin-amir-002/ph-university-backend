import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interface";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import { TAcademicSemester } from "./academicSemester.interface";

// controller for create a student
const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  // will call service func to send this data
  const result = await AcademicSemesterServices.createAcademicSemester(
    req.body
  );

  // send response
  sendResponse<TAcademicSemester | undefined>(
    res,
    true,
    200,
    "Academic semester is created successfully",
    result
  );
});

const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemester(
    req.query
  );

  // send response
  sendResponse<TAcademicSemester[] | undefined>(
    res,
    true,
    200,
    "Successfully get all Academic semester.",
    result
  );
});

const getASingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const { _id } = req.params;
    const result =
      await AcademicSemesterServices.getASingleAcademicSemester(_id);
    // send response
    sendResponse(res, true, 200, "Successfully get Academic semester.", result);
  }
);

const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    _id,
    data
  );
  // send response
  sendResponse(
    res,
    true,
    200,
    "Successfully updated Academic semester.",
    result
  );
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getASingleAcademicSemester,
  updateAcademicSemester,
};
