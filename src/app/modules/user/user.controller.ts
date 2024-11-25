import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { TStudent } from "../student/student.interface";
// import userValidationSchema from "./user.validation";

// controller for create a student
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // validation checking using zod schema
    // const zodParseData = userValidationSchema.parse(userData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDb(
      password,
      studentData
    );

    // send response
    sendResponse<TStudent | undefined>(
      res,
      true,
      200,
      "Student is created successfully",
      result
    );
  } catch (error: any) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
