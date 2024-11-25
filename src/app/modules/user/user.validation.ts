import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .min(1, "Password is required")
    .optional(),
  status: z
    .enum(["in-progress", "blocked"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be one of in-progress or blocked",
    })
    .optional()
    .default("in-progress"),
  isDeleted: z.boolean().default(false).optional(),
});

export default userValidationSchema;
