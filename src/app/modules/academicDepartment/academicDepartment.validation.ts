import { z } from "zod";

export const AcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Academic department name is required!" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain alphabets and spaces",
      }),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic faculty must be a string",
      })
      .trim()
      .min(1, { message: "Faculty is required!" }),
  }),
});
