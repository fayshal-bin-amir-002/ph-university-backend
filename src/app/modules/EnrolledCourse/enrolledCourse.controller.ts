import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Student is enrolled succesfully",
    result,
  );
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Marks is updated succesfully",
    result,
  );
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
