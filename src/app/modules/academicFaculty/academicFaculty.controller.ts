import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import { TAcademicFaculty } from "./academicFaculty.interface";

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFaculty(req.body);

  sendResponse(
    res,
    true,
    200,
    "Academic faculty is created successfully",
    result,
  );
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(
    res,
    true,
    200,
    "Successfully get all Academic faculty.",
    result,
  );
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, true, 200, "Successfully get Academic faculty.", result);
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(
    res,
    true,
    200,
    "Successfully updated Academic faculty.",
    result,
  );
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
