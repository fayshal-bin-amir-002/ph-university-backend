import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CourseSearchableFields } from "../course/course.constant";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemester = async (data: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[data.name] !== data.code) {
    throw new AppError(500, "Invalid semester code!");
  }
  const result = await AcademicSemester.create(data);
  return result;
};

const getAllAcademicSemester = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search([])
    .filter()
    .sort();
  // .paginate()
  // .fields();
  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    data: result,
    meta,
  };
};

const getASingleAcademicSemester = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  return result;
};

const updateAcademicSemester = async (
  _id: string,
  data: Partial<TAcademicSemester>
) => {
  if (
    data.name &&
    data.code &&
    academicSemesterNameCodeMapper[data.name] !== data.code
  ) {
    ("Invalid semester code!");
  }
  const result = await AcademicSemester.findByIdAndUpdate({ _id }, data, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemester,
  getASingleAcademicSemester,
  updateAcademicSemester,
};
