import { Request, Response } from "express";
import { StudentServices } from "./student.service";

// controller for create a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDb(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentData,
};
