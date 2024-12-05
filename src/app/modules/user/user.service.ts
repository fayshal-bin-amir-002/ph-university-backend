import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not given
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  // created a session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    } else {
      throw new AppError(
        500,
        "Admission semester is required to generate a student ID.",
      );
    }

    // create a user (transaction 1)
    const result = await User.create([userData], { session }); // result will be an array

    // create a student
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!");
    }
    // set id, _id as user
    studentData.id = result[0].id;
    studentData.user = result[0]._id; // reference id
    // create a student (transaction 2)
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
    }

    await session.commitTransaction();

    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
  }
};

export const UserServices = {
  createStudentIntoDb,
};
