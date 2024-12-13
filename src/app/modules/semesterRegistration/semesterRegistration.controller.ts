import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );
    sendResponse(
      res,
      true,
      httpStatus.OK,
      "Semester Registration is created successfully!",
      result,
    );
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );
    sendResponse(
      res,
      true,
      httpStatus.OK,
      "Semester Registration is retrieved successfully!",
      result,
    );
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id,
      );
    sendResponse(
      res,
      true,
      httpStatus.OK,
      "Semester Registration is retrieved successfully",
      result,
    );
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );
    sendResponse(
      res,
      true,
      httpStatus.OK,
      "Semester Registration is updated successfully",
      result,
    );
  },
);

// const deleteSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result =
//       await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);
//     sendResponse(
//       res,
//       true,
//       httpStatus.OK,
//       "Semester Registration is updated successfully",
//       result
//     );
//   }
// );

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  // deleteSemesterRegistration,
};
