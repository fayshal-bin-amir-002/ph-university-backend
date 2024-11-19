import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }

  const result = await Student.create(studentData);

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists");
  // }

  // const result = await student.save(); // built-in instance method provided by mongoose

  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentData = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([
    {
      $match: {
        id: id,
      },
    },
  ]);

  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentData,
  deleteStudentFromDb,
};
