import { z } from "zod";

const MonthEnum = z.enum(
  [
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
  {
    errorMap: () => ({ message: "Invalid month. Must be a valid month name." }),
  },
);

const AcademicSemesterNameEnum = z.enum(["Autum", "Summer", "Fall"], {
  errorMap: () => ({
    message:
      "Invalid semester name. Must be one of: 'Autum', 'Summer', or 'Fall'.",
  }),
});

const AcademicSemesterCodeEnum = z.enum(["01", "02", "03"], {
  errorMap: () => ({
    message: "Invalid code. Must be one of: '01', '02', or '03'.",
  }),
});

export const AcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: AcademicSemesterNameEnum,
    year: z.string(),
    code: AcademicSemesterCodeEnum,
    startMonth: MonthEnum,
    endMonth: MonthEnum,
  }),
});

export const UpdateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: AcademicSemesterNameEnum.optional(),
    year: z.string().optional(),
    code: AcademicSemesterCodeEnum.optional(),
    startMonth: MonthEnum.optional(),
    endMonth: MonthEnum.optional(),
  }),
});
