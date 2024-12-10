import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";
import sendResponse from "../../utils/sendResponse";

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Faculty is retrieved succesfully",
    result
  );
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Faculties are retrieved succesfully",
    result
  );
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Faculty is updated succesfully",
    result
  );
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Faculty is deleted succesfully",
    result
  );
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
