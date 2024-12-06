import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Student } from "./student.model";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

// const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
// const queryObj = { ...query };
// const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
// let searchTerm = "";
// if (query?.searchTerm) {
//   searchTerm = query?.searchTerm as string;
// }
// const searchQuery = Student.find({
//   $or: studentSearchableFields.map((field) => ({
//     [field]: { $regex: searchTerm, $options: "i" },
//   })),
// });
// //filtering
// const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
// excludeFields.forEach((el) => delete queryObj[el]);
// console.log(query);
// console.log(queryObj);
// const filterQuery = searchQuery
//   .find(queryObj)
//   .populate("admissionSemester")
//   .populate({
//     path: "academicDepartment",
//     populate: {
//       path: "academicFaculty",
//     },
//   });
// let sort = "-createdAt";
// if (query?.sort) {
//   sort = query.sort as string;
// }
// const sortQuery = filterQuery.sort(sort);
// let limit = 1;
// let page = 1;
// let skip = 0;
// if (query?.limit) {
//   limit = Number(query?.limit);
// }
// if (query?.page) {
//   page = Number(query?.page);
//   skip = (page - 1) * limit;
// }
// const paginationQuery = sortQuery.skip(skip);
// const limitQuery = paginationQuery.limit(limit);
//field limiting
// let fields = "-__v";
// if (query?.fields) {
//   fields = (query?.fields as string).split(",").join(" ");
// }
// const fieldQuery = await limitQuery.select(fields);
// return fieldQuery;
// };

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentData = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  // const result = await Student.aggregate([
  //   {
  //     $match: {
  //       id: id,
  //     },
  //   },
  // ]);

  if (!result) {
    throw new AppError(404, "Student not found!");
  }

  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete student!");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete user!");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
  }
};

const updateStudentDataIntoDb = async (
  id: string,
  payload: Partial<TStudent>
) => {
  const { name, gurdian, localGurdian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`gurdian.${key}`] = value;
    }
  }

  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdatedData[`localGurdian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentData,
  deleteStudentFromDb,
  updateStudentDataIntoDb,
};
