import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import AppError from "../../errors/AppError";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: ["Autum", "Summar", "Fall"],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ["01", "02", "03"],
    },
    startMonth: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    endMonth: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new AppError(500, "Semester is already exists!");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);
