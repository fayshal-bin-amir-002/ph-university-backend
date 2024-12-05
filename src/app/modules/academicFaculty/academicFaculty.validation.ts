import { z } from "zod";

export const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { message: "Faculty name is required." }),
  }),
});
