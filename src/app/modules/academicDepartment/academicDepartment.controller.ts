import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartmemt = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(
    res,
    true,
    200,
    "Academic department is created successfully",
    result,
  );
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
  sendResponse(
    res,
    true,
    200,
    "Academic departments are retrieved successfully",
    result,
  );
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(
    res,
    true,
    200,
    "Academic department is retrieved successfully",
    result,
  );
});

const updateAcademicDeartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );

  sendResponse(
    res,
    true,
    200,
    "Academic department is updated successfully",
    result,
  );
});

export const AcademicDepartmentControllers = {
  createAcademicDepartmemt,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDeartment,
};
