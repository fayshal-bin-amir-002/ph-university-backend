import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validation";

// controller for getting all students data
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();

    res.status(200).json({
      success: true,
      message: "Successfully got all students data.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// controller for getting a single student data
const getSingleStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    const result = await StudentServices.getSingleStudentData(id);

    res.status(200).json({
      success: true,
      message: "Successfully get student data.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// controller for delete a single student data
const deleteStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    const result = await StudentServices.deleteStudentFromDb(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted student data.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
};
