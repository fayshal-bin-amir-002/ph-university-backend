import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentZodValidationSchema from "./student.zod.validation";
// import studentValidationSchema from "./student.validation";

// controller for create a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // validation checking using joi schema
    // const { error, value } = studentValidationSchema.validate(studentData);

    // send response for validation error
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something is wrong!",
    //     error: error.details,
    //   });
    // }

    // validation checking using zod schema
    const zodParseData = studentZodValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDb(zodParseData);

    // send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

// controller for getting all students data
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();

    res.status(200).json({
      success: true,
      message: "Successfully got all students data.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

// controller for getting a single student data
const getSingleStudentData = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const result = await StudentServices.getSingleStudentData(id);

    res.status(200).json({
      success: true,
      message: "Successfully get student data.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

// controller for delete a single student data
const deleteStudentData = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const result = await StudentServices.deleteStudentFromDb(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted student data.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentData,
  deleteStudentData,
};
